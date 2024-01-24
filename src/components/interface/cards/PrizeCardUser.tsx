import React from 'react'
import Image from 'next/image'

const PrizeCardUser = (props: any) => {
    return (
        <div className="flex flex-col rounded-lg bg-white mt-10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
            <div className="h-96 rounded-t-lg object-cover md:h-auto md:!rounded-none md:!rounded-l-lg">
                <Image
                    src={"/_img/prize/" + props.prize.id + ".jpg"}
                    width={200}
                    height={200}
                    alt="" />
            </div>
            <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl text-center font-medium text-neutral-800 dark:text-neutral-50">
                    {props.prize.title}
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {props.prize.description}
                </p>
            </div>
            <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl text-center font-medium text-neutral-800 dark:text-neutral-50">
                    Создатель:
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {props.prize.creator}
                </p>
            </div>
        </div>
    )
}

export default PrizeCardUser
