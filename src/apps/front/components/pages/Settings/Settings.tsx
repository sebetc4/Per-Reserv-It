import { Typography, Container, Tabs, Tab, Box, SvgIcon } from '@mui/material';
import { useState, FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Swiper as ISwiper } from 'swiper/types';
import 'swiper/css';

import { SvgIconComponent } from '@mui/icons-material';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useAppSelector } from '../../../hooks';
import { AccountSettings, PasswordSettings, ProfileSettings } from './compoents';

type TabType = {
    label: 'Général' | 'Profil' | 'Connexion' | 'Adresse';
    icon: SvgIconComponent;
    component: FC;
};

const tabs: TabType[] = [
    {
        label: 'Général',
        icon: SettingsOutlinedIcon,
        component: AccountSettings,
    },
    {
        label: 'Profil',
        icon: Person2OutlinedIcon,
        component: ProfileSettings,
    },
    {
        label: 'Connexion',
        icon: VpnKeyOutlinedIcon,
        component: PasswordSettings,
    },
    {
        label: 'Adresse',
        icon: HomeOutlinedIcon,
        component: AccountSettings,
    },
];

export const Settings = () => {
    const { data: user } = useAppSelector((state) => state.user);
    // State
    const [swiper, setSwiper] = useState<ISwiper | null>(null);
    const [currentTab, setCurrentTab] = useState<number>(0);

    const handleChangeCurrentTab = (e: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
        swiper?.slideTo(newValue, 500);
    };

    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    pt: 6,
                    left: 0,
                    top: 0,
                    bottom: 0,
                    borderRight: 1,
                    borderColor: 'divider',
                }}
            >
                <Typography
                    component='h1'
                    variant='h6'
                    sx={{ ml: 2 }}
                >
                    PARAMÈTRES
                </Typography>
                <Tabs
                    orientation='vertical'
                    value={currentTab}
                    onChange={handleChangeCurrentTab}
                    aria-label='settings tab'
                    sx={{ width: '100%', mt: 4 }}
                >
                    {tabs.map((tab, i) => {
                        if (!(user?.authProvider !== 'credentials' && tab.label === 'Connexion')) {
                            return (
                                <Tab
                                    icon={
                                        <SvgIcon
                                            component={tab.icon}
                                            sx={{ mr: 2 }}
                                        />
                                    }
                                    key={i}
                                    label={tab.label}
                                    id={`tab-${i}`}
                                    iconPosition='start'
                                    sx={{
                                        pr: 8,
                                        justifyContent: 'flex-start',
                                    }}
                                    aria-controls={`tabpanel-${i}`}
                                />
                            );
                        } else {
                            return;
                        }
                    })}
                </Tabs>
            </Box>
            <Container maxWidth='md'>
                <Box sx={{ height: '100%', minHeight: '500px', position: 'relative' }}>
                    <Swiper
                        onSwiper={setSwiper}
                        direction='vertical'
                        allowTouchMove={false}
                        style={{
                            position: 'absolute',
                            inset: 0,
                        }}
                    >
                        {tabs.map((tab, i) => {
                            if (!(user?.authProvider !== 'credentials' && tab.label === 'Connexion')) {
                                return (
                                    <SwiperSlide
                                        style={{ display: 'block', width: '100%', height: '100%' }}
                                        key={`slide-${i}`}
                                    >
                                        <Box
                                            hidden={currentTab !== i}
                                            id={`tabpanel-${i}`}
                                            aria-labelledby={`tab-${i}`}
                                            sx={{ display: 'flex', height: '100%', alignItems: 'center' }}
                                        >
                                            <tab.component />
                                        </Box>
                                    </SwiperSlide>
                                );
                            } else {
                                return;
                            }
                        })}
                    </Swiper>
                </Box>
            </Container>
        </>
    );
};
