import { useLayoutEffect, useState } from 'react';

const EdgeLine = ({ sourceId, targetId }: { sourceId: string; targetId: string }) => {
  // 노드 엘리먼트를 직접 찾아 위치를 계산합니다.
  // 실제 서비스라면 해당 노드들의 위치 상태를 구독하는 방식이 더 견고합니다.
  const [coords, setCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  console.log(coords);
  useLayoutEffect(() => {
    const updateCoords = () => {
      const srcEl = document.getElementById(`node-${sourceId}`);
      const dstEl = document.getElementById(`node-${targetId}`);
      if (srcEl && dstEl) {
        const srcRect = srcEl.getBoundingClientRect();
        const dstRect = dstEl.getBoundingClientRect();
        // 엘리먼트 중앙 좌표 계산
        setCoords({
          x1: srcRect.left + srcRect.width / 2,
          y1: srcRect.top + srcRect.height / 2,
          x2: dstRect.left + dstRect.width / 2,
          y2: dstRect.top + dstRect.height / 2,
        });
      }
    };

    updateCoords();
    // 노드가 움직일 때마다 좌표를 갱신하는 이벤트 리스너가 필요합니다.
    window.addEventListener('scroll', updateCoords);
    window.addEventListener('resize', updateCoords);
    return () => {
      window.removeEventListener('scroll', updateCoords);
      window.removeEventListener('resize', updateCoords);
    };
  }, [sourceId, targetId]);

  return (
    <line
      x1={coords.x1}
      y1={coords.y1}
      x2={coords.x2}
      y2={coords.y2}
      stroke="#CBD5E1"
      strokeWidth="2"
      strokeDasharray="5,5" // 점선 연출
    />
  );
};

export default EdgeLine;
