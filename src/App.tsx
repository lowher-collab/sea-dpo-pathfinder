import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Insights from "./pages/Insights";
import Tools from "./pages/Tools";
import DpoChecker from "./pages/DpoChecker";
import NotFound from "./pages/NotFound";
import ToolsEn from "./pages/ToolsEn";
import DpoCheckerEn from "./pages/DpoCheckerEn";
import ToolsEn from "./pages/ToolsEn";
import DpoCheckerEn from "./pages/DpoCheckerEn";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/dpo-checker" element={<DpoChecker />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
         <Route path="/tools-en" element={<ToolsEn />} />
<Route path="/tools/dpo-checker" element={<DpoCheckerEn />} />
<Route path="/tools-en" element={<ToolsEn />} />
<Route path="/tools/dpo-checker" element={<DpoCheckerEn />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
