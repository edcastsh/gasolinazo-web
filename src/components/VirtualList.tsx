import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react'
import styles from './VirtualList.module.css'

interface Props<T> {
  items: T[]
  itemHeight: number
  overscan?: number
  renderItem: (item: T, index: number) => ReactNode
}

export function VirtualList<T>({ items, itemHeight, overscan = 3, renderItem }: Props<T>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    setContainerHeight(el.clientHeight)
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const totalHeight = items.length * itemHeight
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const visibleCount = Math.ceil(containerHeight / itemHeight) + overscan * 2
  const endIndex = Math.min(items.length, startIndex + visibleCount)

  const visibleItems = items.slice(startIndex, endIndex)

  const handleScroll = useCallback(() => {
    setScrollTop(scrollRef.current?.scrollTop ?? 0)
  }, [])

  return (
    <div ref={scrollRef} className={styles.scroll} onScroll={handleScroll}>
      <div className={styles.spacer} style={{ height: startIndex * itemHeight }} />
      {visibleItems.map((item, i) => renderItem(item, startIndex + i))}
      <div className={styles.spacer} style={{ height: Math.max(0, totalHeight - endIndex * itemHeight) }} />
    </div>
  )
}
