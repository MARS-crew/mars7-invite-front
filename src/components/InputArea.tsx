import Send from '../assets/send.png'

export default function InputArea() {
    return(
        <div className="w-full p-4 pb-6">
            <div className="flex gap-2 items-center max-w-4xl mx-auto">
                <input 
                    className="flex-1 h-12 border border-gray-300 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="마스외전에 관해서 물어보세요." 
                />
                <button className="h-12 w-12 bg-[#4173FF] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <img src={Send} className="h-6 w-6" alt="Send" />
                </button>
            </div>
            <div className="text-center mt-2">
                <span className="text-xs text-gray-500">AI가 생성한 답변은 정확하지 않을 수 있습니다.</span>
            </div>
        </div>
    )
}