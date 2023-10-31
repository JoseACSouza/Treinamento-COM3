import { Link } from "@inertiajs/react";
import FileIcon from "./FileIcon";
import imageFormat from "../../utils/imageFormat";

export default ({className= '', file }) => {
    const filePath = `/storage/${file}`;
    const downloadPath = filePath.split('/');
    console.log(filePath);
    return (
        <div
            className={`flex justify-center pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 `+ className}
        >
            <Link
                href={`/download/${downloadPath}`}
                method="get"
            >

            {
                imageFormat.includes(file.split('.')[1]) ?
                <img src={ filePath}  alt={ file } className="w-44 p-3 hover:bg-sky-500" /> :
                <FileIcon />
            }
            </Link>
        </div>
    );
}
