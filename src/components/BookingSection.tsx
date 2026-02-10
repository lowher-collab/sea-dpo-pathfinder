import { Button } from "@/components/ui/button";
import { FileCheck, CheckCircle, Download } from "lucide-react";

export default function BookingSection() {
  const openSubscriptionForm = () => {
    window.open("https://tally.so/r/1A7MoQ", "_blank");
  };

  return (
    <section id="booking" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-klein/20 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4 animate-fade-in-up">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            订阅最新合规资讯
          </h2>
          <p className="text-muted-foreground text-lg">
            及时获取资讯，助力企业出海
          </p>
        </div>

        {/* CTA Card */}
        <div className="max-w-4xl mx-auto text-center">
          <Button
            variant="cta"
            size="xl"
            className="mx-auto"
            onClick={openSubscriptionForm}
          >
            <FileCheck className="w-5 h-5 mr-2" />
            立即订阅，获取2026合规清单
          </Button>
        </div>
      </div>
    </section>
  );
}
