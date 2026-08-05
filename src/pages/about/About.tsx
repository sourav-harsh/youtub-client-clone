import  { Component } from "react";
export default class About extends Component {
  render() {
    return (
      <div>
        <div className="py-40 bg-white dark:bg-black dark:text-white min-h-[630px]">
          <div className="container m-auto px-6 text-gray-600 dark:text-white md:px-12 xl:px-6">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
              <div className="md:w-5/12 lg:w-5/12">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/5b02f370b105984c3524c21c/1527285786891-0NLNT1YSRXEZUVU55FPX/Otherness+-+About.png?format=500w"
                  alt="image"
                />
              </div>
              <div className="md:w-7/12 lg:w-6/12">
                <h2 className="text-2xl text-gray-900 dark:text-white font-bold md:text-4xl">
                  React development is carried out by passionate developers
                </h2>
                <p className="mt-6 text-gray-600 dark:text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem
                  accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde
                  aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!
                </p>
                <p className="mt-4 text-gray-600 dark:text-white">
                  Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
                  Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
