import { Clock, Database, PieChart, Search, Users, Zap } from 'lucide-react'

export default function KassobokarComparison() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8 bg-[#f0f8f8] font-sans">
      {/* Without Kassobokar */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">Without Kassobokar</h2>
        <h3 className="text-2xl font-bold mb-6">Sluggish and unreliable business planning</h3>
        <ul className="space-y-4">
          {[
            { icon: Clock, text: 'Costly research subscriptions' },
            { icon: Database, text: 'Insights fragmented across data platforms' },
            { icon: PieChart, text: 'Absence of expert-level analysis' },
            { icon: Users, text: 'Demands deep expertise' },
          ].map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <item.icon className="w-6 h-6 text-gray-600" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 bg-gray-300 rounded-full py-2 px-4 inline-flex items-center">
          <span className="font-semibold mr-2">Business plan creation:</span>
          <Clock className="w-4 h-4 mr-1" />
          <span>Days to week</span>
        </div>
      </div>

      {/* With Kassobokar */}
      <div className="flex-1">
        <div className="bg-[#26b6b0] text-white p-6 rounded-2xl relative">
          <span className="absolute top-2 right-2 bg-white text-[#26b6b0] text-xs font-bold py-1 px-2 rounded-full">
            MOST POPULAR
          </span>
          <h2 className="text-xl font-bold mb-4">With Kassobokar</h2>
          <h3 className="text-2xl font-bold mb-6">
            Top-tier busines
            <br />
            in minutes
          </h3>
          <ul className="space-y-4">
            {[
              { icon: Database, text: '100+ public and private data sources' },
              { icon: Zap, text: 'Unparalleled accuracy and industry coverage' },
              { icon: PieChart, text: 'In-depth insights rivaling leading firms' },
              { icon: Search, text: 'User-friendly interface' },
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <item.icon className="w-6 h-6" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 bg-white text-[#26b6b0] rounded-full py-2 px-4 inline-flex items-center">
            <span className="font-semibold mr-2">Business plan creation:</span>
            <Clock className="w-4 h-4 mr-1" />
            <span>Minutes</span>
          </div>
        </div>
      </div>
    </div>
  )
}