import { useState, useRef, useEffect, useCallback } from 'react';

const OPTIONS = [
    { value: 'accident', label: 'Car Accident', icon: '🚗' },
    { value: 'medical', label: 'Medical Emergency', icon: '🏥' },
    { value: 'fire', label: 'Fire Outbreak', icon: '🔥' },
    { value: 'other', label: 'Other Critical', icon: '⚠️' }
];

export default function EmergencySelect({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const selectedOption = OPTIONS.find(opt => opt.value === value) || OPTIONS[0];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = useCallback((val) => {
        onChange(val);
        setIsOpen(false);
    }, [onChange]);

    return (
        <div className="emergency-select" ref={containerRef}>
            <div className={`emergency-select__trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <span className="trigger-icon">{selectedOption.icon}</span>
                <span className="trigger-label">{selectedOption.label}</span>
                <span className="trigger-chevron">▼</span>
            </div>
            {isOpen && (
                <div className="emergency-select__dropdown animate-in">
                    {OPTIONS.map(opt => (
                        <div key={opt.value} className={`option ${value === opt.value ? 'selected' : ''}`} onClick={() => handleSelect(opt.value)}>
                            <span className="option-icon">{opt.icon}</span>
                            <span className="option-label">{opt.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
