import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex">

        <Carousel
          opts={{
            align: "start", loop: true
          }}
          className="h-100 w-100"
        >
          <CarouselContent
          >
            <CarouselItem>
              <Image src="/images/task5.svg" alt="Tasks" width={800} height={800} />
            </CarouselItem>
            <CarouselItem>
              <Image src="/images/task3.svg" alt="Tasks" width={800} height={800} />
            </CarouselItem>
            <CarouselItem>
              <Image src="/images/task4.svg" alt="Tasks" width={800} height={800} />
            </CarouselItem>
            <CarouselItem>
              <Image src="/images/task6.svg" alt="Tasks" width={800} height={800} />
            </CarouselItem><CarouselItem>
              <Image src="/images/task7.svg" alt="Tasks" width={800} height={800} />
            </CarouselItem>
            <CarouselItem>
              <Image src="/images/task2.svg" alt="Tasks" height={500} width={500} />
            </CarouselItem>
          </CarouselContent>
        </Carousel>

      </div>
    </main>
  );
}
