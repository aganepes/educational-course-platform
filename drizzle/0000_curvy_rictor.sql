CREATE SCHEMA "test";
--> statement-breakpoint
CREATE TYPE "test"."course_group" AS ENUM('construction', 'programming');--> statement-breakpoint
CREATE TABLE "test"."courses" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"group" "test"."course_group" NOT NULL,
	"category" varchar(100) NOT NULL,
	"subcategory" varchar(100) NOT NULL,
	"title" jsonb NOT NULL,
	"instructor_id" varchar(255) NOT NULL,
	"rating" real DEFAULT 0 NOT NULL,
	"level" text,
	"duration_hours" integer DEFAULT 0 NOT NULL,
	"start-time" integer DEFAULT 0 NOT NULL,
	"public_duration_seconds" integer DEFAULT 360 NOT NULL,
	"lessons" integer DEFAULT 0 NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"video_url" text NOT NULL,
	"is_hsl_ready" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test"."instructors" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" jsonb NOT NULL,
	"profession" jsonb NOT NULL,
	"avatar" text NOT NULL,
	"socials" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test"."purchases" (
	"user_id" varchar(255) NOT NULL,
	"course_id" varchar(255) NOT NULL,
	"price_paid" integer DEFAULT 0 NOT NULL,
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "purchases_user_id_course_id_pk" PRIMARY KEY("user_id","course_id")
);
--> statement-breakpoint
CREATE TABLE "test"."users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" text,
	"phone" varchar(20),
	"password" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"active_session_id" text,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "test"."purchase_verifications" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"course_id" varchar(255) NOT NULL,
	"code" varchar(6) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "test"."courses" ADD CONSTRAINT "courses_instructor_id_instructors_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "test"."instructors"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test"."purchases" ADD CONSTRAINT "purchases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "test"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test"."purchases" ADD CONSTRAINT "purchases_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "test"."courses"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "courses_group_idx" ON "test"."courses" USING btree ("group");--> statement-breakpoint
CREATE INDEX "courses_category_idx" ON "test"."courses" USING btree ("category");--> statement-breakpoint
CREATE INDEX "courses_instructor_idx" ON "test"."courses" USING btree ("instructor_id");--> statement-breakpoint
CREATE INDEX "purchases_user_idx" ON "test"."purchases" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "purchases_course_idx" ON "test"."purchases" USING btree ("course_id");--> statement-breakpoint
CREATE INDEX "verification_user_course_idx" ON "test"."purchase_verifications" USING btree ("user_id","course_id");