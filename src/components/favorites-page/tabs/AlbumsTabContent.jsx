import useSWR from 'swr';
import { getYearFromDate } from '@/utils/app-helper';
import LinkCardItem from '@/components/list-items/LinkCardItem';

const AlbumsTabContent = ({ albums }) => {
    const { data } = useSWR({ entitiesId: albums, endpoint: '/api/album' });

    return (
        <ul>
        {
            data.map((album) => {
                const { id, title, cover_xl, release_date } = album;
                const releaseYear = getYearFromDate(release_date);

                return (
                    <LinkCardItem
                        key={ id }
                        title={ title }
                        imgSrc={ cover_xl }
                        href={ `/album/${ id }` }
                        description={ `Album  | ${ releaseYear }` }
                    />
                );
            })
        }
        </ul>
    );
};

export default AlbumsTabContent;