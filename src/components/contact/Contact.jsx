import toast from "react-hot-toast";

const Contact = () => {
  const api = import.meta.env.VITE_API;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.msg.value;

    try {
      const res = await fetch(`${api}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message || error.msg || "Something went wrong");
    }

    e.target.reset();
  };

  return (
    <section className="mt-[100px] flex justify-center items-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-[#1F2933] text-center">
          Get in <span className="text-[#5FAFB0]">touch</span>
        </h1>

        <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="flex flex-col gap-5"
        >
          <input
            required
            type="text"
            placeholder="Your name"
            name="name"
            className="
          w-full rounded-lg px-4 py-3
          border border-[#E5E7EB]
          placeholder:text-gray-400
          focus:outline-none focus:border-[#5FAFB0]
          transition
        "
          />

          <input
            required
            type="email"
            placeholder="Your email"
            name="email"
            className="
          w-full rounded-lg px-4 py-3
          border border-[#E5E7EB]
          placeholder:text-gray-400
          focus:outline-none focus:border-[#5FAFB0]
          transition
        "
          />

          <textarea
            required
            name="msg"
            rows="5"
            placeholder="Your message"
            className="
          w-full rounded-lg px-4 py-3
          border border-[#E5E7EB]
          placeholder:text-gray-400
          focus:outline-none focus:border-[#5FAFB0]
          transition resize-none
        "
          />

          <button
            type="submit"
            className="cursor-pointer 
          mt-2 rounded-lg bg-[#C1DCDC] py-3 font-semibold text-[#1F2933]
          hover:bg-[#A8CFCF] active:scale-[0.98]
          transition
        "
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
