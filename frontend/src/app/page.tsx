import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-5">
      <div className="flex flex-col gap-10">
        <div>
          <h1 className="text-5xl capitalize leading-normal">
            Effortlessly organize your life,<br /> one task at a time.
          </h1>
        </div>
        <Carousel
          opts={{
            align: "start", loop: true
          }}
        >
          <CarouselContent
          >
            <CarouselItem className="flex justify-center items-center" >
              <Image src="/images/task5.svg" alt="Tasks" width={500} height={500} />
            </CarouselItem>
            <CarouselItem className="flex justify-center items-center">
              <Image src="/images/task3.svg" alt="Tasks" width={500} height={500} />
            </CarouselItem>
            <CarouselItem className="flex justify-center items-center">
              <Image src="/images/task4.svg" alt="Tasks" width={500} height={500} />
            </CarouselItem>
            <CarouselItem className="flex justify-center items-center">
              <Image src="/images/task6.svg" alt="Tasks" width={500} height={500} />
            </CarouselItem><CarouselItem className="flex justify-center items-center">
              <Image src="/images/task7.svg" alt="Tasks" width={500} height={500} />
            </CarouselItem>
            <CarouselItem className="flex justify-center items-center">
              <Image src="/images/task2.svg" alt="Tasks" width={500} height={500} />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div className="flex md:gap-20 items-center flex-col md:flex-row gap-5">
          <p className="md:text-lg">
            Experience the power of effortless organization and start conquering your to-do list today. Sign up for ticklist and take the first step towards a more organized, productive, and fulfilling life.
          </p>
          <Button className="text-xl font-bold text-primary-foreground ">
            <Link href={'/auth/login'} className="flex flex-nowrap">
              LOGIN <ChevronRight />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
