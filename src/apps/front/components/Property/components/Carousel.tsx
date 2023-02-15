import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import { Box } from '@mui/material';
import { PropertySchema } from '../../../../../packages/types/properties.types';
import { ImageType } from '../../../../../packages/types/common.types';
import 'swiper/css';
import 'swiper/css/pagination';

interface ICarouselProps {
    name: PropertySchema['name'];
    images: ImageType[];
}

SwiperCore.use([Pagination]);

export default function Carousel({ name, images }: ICarouselProps) {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '600px',
                height: '400px',
            }}
        >
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                speed={500}
                loop={true}
                touchRatio={1.5}
                navigation={true}
                pagination={{ clickable: true }}
                style={{ width: '100%', height: '100%' }}
            >
                {images.map((image, i) => (
                    <SwiperSlide key={`${image.public_id}-${i}`} style={{ width: '100%', height: '100%' }}>
                        <Image
                            src={image.url}
                            alt={name}
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
