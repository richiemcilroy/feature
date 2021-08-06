export default function ContentFeature(props) {  
  return(
    <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="relative">
          {
            props?.data?.section_title &&
            <p className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {props?.data?.section_title}
            </p>
          }
          {
            props?.data?.section_content &&
            <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
              {props?.data?.section_content}
            </p>
          }
        </div>
      </div>
    </div>
  )
};