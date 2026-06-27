import { useState } from 'react';
import { 
  FileSearch, 
  CheckCircle2, 
  AlertTriangle, 
  Save, 
  RefreshCcw, 
  ChevronRight,
  ChevronLeft,
  Search,
  FileText
} from 'lucide-react';

export function AIExtraction() {
  const [activeTab, setActiveTab] = useState('timesheet');
  
  const [fields, setFields] = useState({
    employeeName: { value: 'John Smith', confidence: 99 },
    employeeId: { value: 'EMP-40921', confidence: 98 },
    clientName: { value: 'Infosys Ltd', confidence: 99 },
    period: { value: 'Oct 1 - Oct 15, 2026', confidence: 95 },
    regularHours: { value: '80', confidence: 99 },
    overtimeHours: { value: '12', confidence: 72 },
    managerSignature: { value: 'Present', confidence: 90 },
  });

  const handleFieldChange = (key: string, newValue: string) => {
    setFields(prev => ({
      ...prev,
      [key]: { ...prev[key as keyof typeof fields], value: newValue, confidence: 100 } // Manual edit = 100% conf
    }));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Area */}
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-muted-foreground mb-2">
            <span className="text-xs font-mono uppercase tracking-widest hover:text-primary cursor-pointer transition-colors">Timesheet Inbox</span>
            <ChevronRight size={14} />
            <span className="text-xs font-mono uppercase tracking-widest text-foreground">TS-89442</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">AI Extraction Review</h1>
          <p className="text-muted-foreground text-[15px]">Review and edit OCR results before business validation.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-panel border border-border hover:bg-card text-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
            <RefreshCcw size={16} className="mr-2" /> Re-Scan
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
            <Save size={16} className="mr-2" /> Confirm & Validate
          </button>
        </div>
      </div>

      {/* Main Split Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Document Viewer */}
        <div className="w-1/2 flex flex-col border-r border-[#2A3442]/50 bg-[#0B0F14] relative">
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-panel/30">
            <div className="flex items-center space-x-4">
              <button 
                className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${activeTab === 'timesheet' ? 'bg-panel border border-border text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setActiveTab('timesheet')}
              >
                Original Document
              </button>
              <button 
                className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${activeTab === 'json' ? 'bg-panel border border-border text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setActiveTab('json')}
              >
                Raw JSON
              </button>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Search size={16} className="hover:text-foreground cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center bg-black/20">
            {activeTab === 'timesheet' ? (
              <div className="w-full max-w-lg aspect-[1/1.4] bg-white rounded-md shadow-2xl relative">
                {/* Simulated Timesheet Document */}
                <div className="p-8 text-black font-sans relative">
                  <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
                    <div>
                      <h2 className="text-2xl font-bold uppercase tracking-wider">Timesheet</h2>
                      <p className="text-sm text-gray-500 mt-1">Infosys Ltd - Q3 Contractor</p>
                    </div>
                    <FileText size={48} className="text-gray-300" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-bold text-gray-500 text-xs uppercase tracking-wide block mb-1">Employee Name</span>
                        <div className="border-b border-gray-300 pb-1 font-medium bg-blue-50/50">John Smith</div>
                      </div>
                      <div>
                        <span className="font-bold text-gray-500 text-xs uppercase tracking-wide block mb-1">Employee ID</span>
                        <div className="border-b border-gray-300 pb-1 font-mono bg-blue-50/50">EMP-40921</div>
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-gray-500 text-xs uppercase tracking-wide block mb-1">Billing Period</span>
                      <div className="border-b border-gray-300 pb-1 font-medium">Oct 1 - Oct 15, 2026</div>
                    </div>

                    <table className="w-full text-sm mt-8">
                      <thead>
                        <tr className="border-b-2 border-black text-left">
                          <th className="py-2">Category</th>
                          <th className="py-2 text-right">Hours</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-3">Regular Work</td>
                          <td className="py-3 text-right font-medium">80</td>
                        </tr>
                        <tr className="border-b border-gray-200 bg-yellow-50/50">
                          <td className="py-3 flex items-center"><AlertTriangle size={14} className="text-yellow-600 mr-2" /> Overtime</td>
                          <td className="py-3 text-right font-medium text-red-600">12</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-12 pt-8 border-t border-gray-300">
                      <span className="font-bold text-gray-500 text-xs uppercase tracking-wide block mb-4">Manager Approval</span>
                      <div className="w-48 border-b border-black pb-2">
                        <span className="font-writing text-xl text-blue-800">J. Doe</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Simulated AI scanning overlay */}
                <div className="absolute top-[20%] left-0 w-full h-1 bg-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-[scan_3s_ease-in-out_infinite]"></div>
              </div>
            ) : (
              <div className="w-full h-full bg-[#151A21] rounded-lg border border-border p-6 overflow-auto font-mono text-sm text-primary/80">
                <pre>{JSON.stringify({
                  "document_type": "timesheet",
                  "confidence_overall": 0.94,
                  "entities": [
                    { "type": "PERSON", "text": "John Smith", "conf": 0.99, "bbox": [120, 45, 210, 60] },
                    { "type": "ID", "text": "EMP-40921", "conf": 0.98, "bbox": [120, 65, 210, 80] },
                    { "type": "ORG", "text": "Infosys Ltd", "conf": 0.99, "bbox": [300, 45, 380, 60] },
                    { "type": "DATE_RANGE", "text": "Oct 1 - Oct 15, 2026", "conf": 0.95, "bbox": [120, 85, 280, 100] },
                    { "type": "HOURS_REGULAR", "text": "80", "conf": 0.99, "bbox": [350, 150, 380, 165] },
                    { "type": "HOURS_OVERTIME", "text": "12", "conf": 0.72, "bbox": [350, 170, 380, 185] },
                    { "type": "SIGNATURE", "text": "Present", "conf": 0.90, "bbox": [120, 250, 200, 280] }
                  ]
                }, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Extraction Fields */}
        <div className="w-1/2 flex flex-col bg-[#0B0F14] overflow-y-auto p-10">
          <div className="max-w-xl mx-auto w-full space-y-8">
            
            <div className="bg-panel border border-border/50 rounded-xl p-5 mb-8 flex items-start space-x-4 shadow-sm">
              <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                <FileSearch className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">AI Extraction Complete</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The document has been successfully processed. Please review the extracted fields below. Fields with lower confidence scores have been highlighted.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(fields).map(([key, data]) => {
                const isLowConfidence = data.confidence < 85;
                const isEdited = data.confidence === 100;
                
                return (
                  <div key={key} className="relative group">
                    <label className="text-[13px] font-medium text-muted-foreground block mb-1.5 capitalize flex items-center justify-between">
                      <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <div className="flex items-center space-x-1.5">
                        {isEdited ? (
                          <span className="text-[10px] uppercase font-mono tracking-widest text-primary flex items-center"><Save size={10} className="mr-1" /> Manual Edit</span>
                        ) : (
                          <span className={`text-[10px] uppercase font-mono tracking-widest flex items-center ${isLowConfidence ? 'text-warning' : 'text-success'}`}>
                            {isLowConfidence ? <AlertTriangle size={10} className="mr-1" /> : <CheckCircle2 size={10} className="mr-1" />}
                            {data.confidence}% Conf
                          </span>
                        )}
                      </div>
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={data.value}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        className={`w-full bg-[#151A21] border ${isLowConfidence && !isEdited ? 'border-warning/50 focus:border-warning' : 'border-[#2A3442] focus:border-primary'} hover:border-[#2A3442]/80 focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm text-foreground transition-all outline-none shadow-sm`}
                      />
                      {isLowConfidence && !isEdited && (
                        <div className="absolute inset-0 ring-1 ring-warning/30 rounded-xl pointer-events-none animate-pulse"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
