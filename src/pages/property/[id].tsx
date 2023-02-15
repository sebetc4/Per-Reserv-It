import Head from 'next/head';
import { Property } from '../../apps/front/components';
import { useAppSelector } from '../../apps/front/hooks/redux.hooks';
import { fetchOneProperty } from '../../store/slices/property.slice';
import { wrapper } from '../../store/store';

export default function PropertyPage() {
    const { error, data: property } = useAppSelector((state) => state.property);

    return (
        <>
            <Head>
                <title>{`${property?.name || 'Hébergement'} - Reserv'It`}</title>
            </Head>
            <Property />
        </>
    );
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
    if (typeof params?.id === 'string') {
        await store.dispatch(fetchOneProperty(params.id));
    }
    return {
        props: {},
    };
});
