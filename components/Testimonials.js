import IframeResizer from 'iframe-resizer-react'

export default function Testimonials() {
  return(
    <div className="py-8 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="sm:flex sm:flex-col sm:align-center text-center mb-5">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Our early supporters
          </h2>
        </div>
        <IframeResizer
          src="https://embed.testimonial.to/w/feature-so?theme=light&card=base"
          style={{ width: "1px", minWidth: "100%" }}
        />
      </div>
    </div>
  );
}