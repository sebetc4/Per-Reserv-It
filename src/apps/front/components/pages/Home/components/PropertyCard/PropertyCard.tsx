import Typography from '@mui/material/Typography';
import { PropertyPreview } from '../../../../../../../packages/types/properties.types';
import Image from 'next/image';
import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import vanillaTilt from 'vanilla-tilt';
import { propertyCategories } from '../../../../../../../packages/constants';


interface IPropertyCardProps {
    property: PropertyPreview;
}

export default function PropertyItem({ property }: IPropertyCardProps) {

    const cardRef = useRef<HTMLElement>(null);

    useEffect(() => {
        cardRef.current && vanillaTilt.init(cardRef.current, {
            scale: 1.03,
            speed: 1000,
            transition: true,
            max: 10
        });
      }, []);

    return (
        <Link
            href={`/property/${property.id}`}
            style={{ textDecoration: 'none', width: '100%', maxWidth: '300px' }}
        >
            <Box
                component='article'
                ref={cardRef}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow:
                        '0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)',
                    borderRadius: 3,
                    cursor: 'pointer',
                    color: 'text.primary',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow:
                            '0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)',
                    },
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '200px',
                        position: 'relative',
                    }}
                >
                    <Image
                        alt={property.name}
                        fill
                        src={property.images[0].url}
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        padding: 2,
                        width: '100%',
                    }}
                >
                    <Typography
                        gutterBottom
                        variant='h5'
                        component='h3'
                    >
                        {property.name}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant='subtitle1'
                    >
                        {`${propertyCategories[property.category]} à ${property.location.city}`}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                    >
                        {property.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Rating
                            name={`rating-${property.name}`}
                            value={property.rating}
                            readOnly
                            precision={0.5}
                            emptyIcon={
                                <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize='inherit'
                                />
                            }
                        />
                        <Typography
                            color='text.secondary'
                            sx={{ fontSize: '.9rem', ml: 1 }}
                        >
                            ({property.numbOfReview} avis)
                        </Typography>
                    </Box>
                    <Typography
                        color='text.secondary'
                        sx={{ mt: 1 }}
                    >
                        À partir de {property.minPrice}€ / nuit
                    </Typography>
                </Box>
            </Box>
        </Link>
    );
}
