"use client"

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onIndexChange: (index: number) => void
}

export function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Massştaby we pozisiýany arassalamak
  const resetZoom = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  // Indiki / Öňki surata geçmek
  const handleNext = useCallback(() => {
    resetZoom()
    onIndexChange((currentIndex + 1) % images.length)
  }, [currentIndex, images.length, onIndexChange, resetZoom])

  const handlePrev = useCallback(() => {
    resetZoom()
    onIndexChange((currentIndex - 1 + images.length) % images.length)
  }, [currentIndex, images.length, onIndexChange, resetZoom])

  // Syçanjygyň tigirçigi (Wheel Zoom) arkaly ulaltmak/kiçeltmek
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const zoomFactor = 0.15
    if (e.deltaY < 0) {
      // Ýokaryk tigirlenende ulaltmak
      setScale((prev) => Math.min(prev + zoomFactor, 4))
    } else {
      // Aşak tigirlenende kiçeltmek
      setScale((prev) => {
        const newScale = Math.max(prev - zoomFactor, 1)
        if (newScale === 1) setPosition({ x: 0, y: 0 })
        return newScale
      })
    }
  }, [])

  // Klaviatura arkaly dolandyrmak (Esc, Çep, Sag)
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleNext, handlePrev, onClose])

  if (!isOpen) return null

  // Zoom düwmeleri
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4))
  const zoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1)
      if (newScale === 1) setPosition({ x: 0, y: 0 })
      return newScale
    })
  }

  // Drag (Süýşürmek) Mehanizmi
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => setIsDragging(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md select-none">
      
      {/* Ýokarky Dolandyryş Paneli */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-black/50 p-2 rounded-xl border border-white/10">
        <Button variant="ghost" size="icon" onClick={zoomIn} className="text-white hover:bg-white/20">
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={zoomOut} className="text-white hover:bg-white/20">
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={resetZoom} className="text-white hover:bg-white/20">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <div className="h-4 w-px bg-white/20 mx-1" />
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-red-500/80">
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Surat Sany Informasiýasy */}
      <div className="absolute top-4 left-4 z-50 bg-black/50 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Öňki / Indiki Düwmeleri */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="absolute left-4 z-50 h-12 w-12 rounded-full bg-black/40 text-white hover:bg-black/70"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="absolute right-4 z-50 h-12 w-12 rounded-full bg-black/40 text-white hover:bg-black/70"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Surat Render edilýän zolak */}
      <div
        className="relative h-full w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={images[currentIndex]}
          alt="Lightbox preview"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-md"
          draggable={false}
        />
      </div>
    </div>
  )
}