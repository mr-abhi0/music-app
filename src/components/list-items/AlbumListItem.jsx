import Link from "next/link";

const AlbumListItem = ({ id, title, imgSrc, releaseDate }) => {
    return (
        <li>
            <Link href={ `album/${ id }` }>
                <div>
                    <img src={ imgSrc } alt="" />
                    <span>{ title }</span>

                    <div>
                        <span>Album</span>
                        <span>{ releaseDate }</span>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default AlbumListItem;