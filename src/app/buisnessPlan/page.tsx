import FAQ from "@/components/buisnessPlanlanding/faq"
import AIBusinessPlan from "@/components/buisnessPlanlanding/generator"
import WorldClassPlan from "@/components/buisnessPlanlanding/hero"
import SecurityCompliance from "@/components/buisnessPlanlanding/security"
import WhyChoose from "@/components/buisnessPlanlanding/whychoose"


const page = () => {
  return (
    <div className="w-full " >
        <WorldClassPlan />
        <AIBusinessPlan />
        <WhyChoose />
        <SecurityCompliance />
        <FAQ />
    </div>
  )
}

export default page