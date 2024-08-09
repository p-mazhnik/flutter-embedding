import React, { memo } from 'react'
import { ViewWrapper } from './ViewWrapper'
import { Counter } from './pages/Counter'

interface ReactViewProps {
  onClicksChange?: (clicks: number) => void;
  removeView: () => void;

  clicks: number;

  className?: string | undefined
}

export const ReactView: React.FC<ReactViewProps> = memo(({
  clicks,
  onClicksChange,
  removeView,
  className,
}) => {
  return (
    <ViewWrapper className={className} removeView={removeView}>
      <Counter clicks={clicks} onClicksChange={onClicksChange} />
    </ViewWrapper>
  )
})
