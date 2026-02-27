import { renderHook } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("LanguageContext", () => {
    it("should default to English ('en')", () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <LanguageProvider>{children}</LanguageProvider>
        );
        const { result } = renderHook(() => useLanguage(), { wrapper });
        expect(result.current.lang).toBe("en");
    });
});
