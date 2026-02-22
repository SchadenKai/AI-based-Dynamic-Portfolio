"use client";

import { useEffect, useRef } from 'react';
import { useLayoutStore, SectionName } from '@/store/useLayoutStore';

interface StoreInitializerProps {
    availableSections: SectionName[];
}

export function StoreInitializer({ availableSections }: StoreInitializerProps) {
    const initialized = useRef(false);

    if (!initialized.current) {
        useLayoutStore.getState().setDefaultLayout(availableSections);
        // Only set layout if not already configured by AI
        if (!useLayoutStore.getState().isConfigured) {
            useLayoutStore.getState().setLayout(availableSections, []);
        }
        initialized.current = true;
    }

    return null;
}
