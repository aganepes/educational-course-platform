Backend tarapda amala aşyrylmaly işler, ulanylýan API URL-ler we tutuş proses aşakdaky ýaly guralýar.

---

### 1. Töleg Ulgamynyň Esasy API Endpoint-leri (URL-ler)

Türkmenistandaky banklaryň (esasan Sberbank / SmartVista REST API binýadyndaky) standart test we önümçilik URL-leri aşakdakylardan ybarat bolýar:

* **Base URL (Test):** `[https://test.pay.bank.tm/payment/rest/](https://test.pay.bank.tm/payment/rest/)`
* **Base URL (Production):** `[https://pay.bank.tm/payment/rest/](https://pay.bank.tm/payment/rest/)`

Backend tarapda ulanylýan esasy 3 sany endpoint:

| Ulanylyş Maksady | Endpoint URL | HTTP Usuly | Description |
| --- | --- | --- | --- |
| **1. Sargyt Ýazmak** | `/register.do` | `POST` | Bankda täze töleg sessiýasyny açýar we `formUrl` (bank sahypasynyň URL-ini) gaýtarýar. |
| **2. Status Barlaýyş** | `/getOrderStatusHTTP.do` | `POST` / `GET` | Tölegiň geçendigini (`orderStatus: 2`) barlamak üçin ulanylýar. |
| **3. Pul Yza Gaýtarmak** | `/reverse.do` ýa-da `/refund.do` | `POST` | Sargyt ýatyrylanda ýa-da ýalňyşlyk bolanda puly yza gaýtarmak üçin. |

---

### 2. Backend-iň Adäma-Ädim Ýerine Ýetirmeli İşleri (Proses Workflow)

#### Ädim 1: Client-den Sargyt İstegini Almak (`/api/checkout`)

1. Frontend (Next.js) sargyt maglumatlaryny (`items`, `amount`, `address`) backend-e ugradýar.
2. Backend gelen maglumatlary **Zod** arkaly barlap, bazada täze sargyt döredýär (Status: `PENDING`).
3. Banka ugratmak üçin unikal `orderNumber` (mysal üçin: `ORD-2026-9812`) öndürýär.

#### Ädim 2: Bankdan Töleg URL-ini Almak (`register.do`)

Backend Bankyň API-sine HTTP Request ugradýar:

* **Request Data:**
* `userName`: Bankyň size beren Merchant API Logini
* `password`: Merchant API Paroly
* `orderNumber`: `ORD-2026-9812`
* `amount`: `15000` *(150.00 TMT = teňňe görnüşinde 15000 teňňe)*
* `returnUrl`: `[https://yoursite.tm/api/checkout/callback](https://yoursite.tm/api/checkout/callback)` *(Töleg tamamlananda bankyň ulanyjyny geçirmeli ýeri)*
* `failUrl`: `[https://yoursite.tm/checkout/failed](https://yoursite.tm/checkout/failed)`



Bank backend-e aşakdaky ýaly joş gaýtarýar:

```json
{
  "orderId": "7d6c5b4a-3e2d-1c0b",
  "formUrl": "https://test.pay.bank.tm/payment/merchants/pages/payment_tk.html?mdOrder=7d6c5b4a-3e2d-1c0b",
  "errorCode": "0"
}

```

Backend öz bazasynda şol sargyda Bankyň `orderId`-sini ýazyp goýýar we `formUrl`-i frontend-e gaýtarýar.

#### Ädim 3: Ulanyjyny Bank Sahypasyna Ugratmak

Frontend ulanyjyny alyp gelen `formUrl` adrese **`window.location.href`** edýär. Ulanyjy kart nomerini we SMS OTP-ni göni bankyň serwerinde girizýär.

#### Ädim 4: Callback / Return URL Barlagy (`/api/checkout/callback`)

Töleg gutarandan soň bank ulanyjyny siziň görkezen `returnUrl` adresiňize redirect edýär:
`[https://yoursite.tm/api/checkout/callback?orderId=7d6c5b4a-3e2d-1c0b](https://yoursite.tm/api/checkout/callback?orderId=7d6c5b4a-3e2d-1c0b)`

**Gaty möhüm:** Diňe URL-e ugradyldy diýip tölegi üstünlikli diýip Hasap Etmeli Däl!

Backend şol заman öz gezeginde Bankyň `/getOrderStatusHTTP.do` URL-ine `orderId` bilen garşylykly request ugratmaly:

```typescript
// Backend-iň bankdan status soramasy
const response = await fetch("https://test.pay.bank.tm/payment/rest/getOrderStatusHTTP.do", {
  method: "POST",
  body: new URLSearchParams({
    userName: process.env.BANK_USER!,
    password: process.env.BANK_PASS!,
    orderId: bankOrderId,
  }),
});

const statusData = await response.json();

```

#### Ädim 5: Baza Ýagdaýyny Üýtgetmek we Sahypa Ugratmak

Bank status tassyklamasyny gaýtarsa:

* `orderStatus === 2`: **Töleg Üstünlikli!** Backend bazadaky sargydy `PAID` diýip üýtgedýär we ulanyjyny sargydyň üstünlikli geçendigini görkezýän sahypa ugradýar (`/checkout/success`).
* `orderStatus !== 2`: **Töleg Başarsyz!** Bazada status `FAILED` bolýar we ulanyjy ýalňyşlyk sahypasyna ugradylýar (`/checkout/failed`).