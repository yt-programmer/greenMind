import React from "react";
import { useKeenSlider } from "keen-slider/react";
import p1 from "../../assets/person1.webp";
import p2 from "../../assets/person2.webp";
import "keen-slider/keen-slider.min.css";

const rates = [
  {
    id: 1,
    name: "John Doe",
    position: "Youtuber",
    img: p1,
    desc: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    rate: 4.5,
  },
  {
    id: 2,
    name: "John Doe",
    position: "Youtuber",
    img: p2,
    desc: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    rate: 5,
  },
  {
    id: 3,
    name: "John Doe",
    position: "Youtuber",
    img: p2,
    desc: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    rate: 5,
  },
];

const Testimonials = () => {
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    slides: { perView: 1.4, spacing: 40 },
  });

  return (
    <section className="py-24">
      <div className="container mx-auto px-5">
        <h1 className="text-3xl font-bold mb-12">
          What customers say about <br /> GREEMIND?
        </h1>

        <div ref={sliderRef} className="keen-slider">
          {rates.map((rate) => (
            <div
              key={rate.id}
              className="keen-slider__slide bg-[#C1DCDC] p-8 rounded-2xl min-w-[300px]"
            >
              <p className="text-gray-800 mb-4">{rate.desc}</p>
              <div className="flex md:flex-row flex-col gap-10 items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={rate.img}
                    alt={rate.name}
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold">{rate.name}</h4>
                    <span className="text-sm text-gray-600">
                      {rate.position}
                    </span>
                  </div>
                </div>
                <span className="flex items-center gap-1 font-semibold">
                  <svg
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.51332 18.6794C4.03082 18.9269 3.48332 18.4931 3.58082 17.9394L4.61832 12.0269L0.214567 7.83188C-0.196683 7.43938 0.0170668 6.72188 0.568317 6.64438L6.69082 5.77438L9.42082 0.365625C9.66707 -0.121875 10.3333 -0.121875 10.5796 0.365625L13.3096 5.77438L19.4321 6.64438C19.9833 6.72188 20.1971 7.43938 19.7846 7.83188L15.3821 12.0269L16.4196 17.9394C16.5171 18.4931 15.9696 18.9269 15.4871 18.6794L9.99832 15.8594L4.51332 18.6794Z"
                      fill="#1E1E1E"
                    />
                  </svg>
                  {rate.rate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
