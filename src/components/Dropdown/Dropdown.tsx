import React, { useEffect, useState } from 'react';

interface Option {
  label: string;
  value: number | boolean;
}

interface DropdownProps {
  buttonRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  options: Option[];
  onSelect: (option: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonRef,
  onClose,
  options,
  onSelect,
}) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    // 버튼 위치를 기준으로 드롭다운 메뉴 위치 설정
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      console.log('rect', rect);
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    // 외부 클릭 시 드롭다운 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [buttonRef, onClose]);

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
      onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
      style={{ top: position.top, left: position.left }}
      className={`absolute  z-10 cursor-pointer border bg-white pl-4 pr-10 py-10 `}
    >
      <ul className='flex flex-col gap-4'>
        {options.map((option, index) => (
          <li
            key={index}
            className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
            onClick={() => {
              onSelect(option);
              onClose(); // 선택 후 드롭다운 닫기
            }}
          >
            {option.label} {/* label 표시 */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
