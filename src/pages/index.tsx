import { wrapper } from '../store/store';
import { fetchProperties } from '../store/slices/properties.slice';
import { Home } from '../apps/front/components';

export default function HomePage() {
    return <Home />;
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params, query }) => {
    const currentPage = typeof query.page === 'string' ? query.page : '1';
    const location = typeof query.location === 'string' ? query.location : null;
    const category = typeof query.category === 'string' ? query.category : 'all'
    const guests = typeof query.guests === 'string' ? query.guests : null
    await store.dispatch(fetchProperties({ currentPage, location, category, guests}));
    return {
        props: {},
    };
});