import { Link } from "@inertiajs/react";
import FileIcon from "./FileIcon";
import imageFormat from "../../utils/imageFormat";

export default ({className= '', file }) => {
    const filePath = `/storage/${file}`;
    const downloadPath = filePath.split('/');

    return (
        <><p className="px-3 py-2 font-semibold leading-5">Anexo:</p><div
            className={`flex justify-center items-start pointer-events-auto ` + className}
        >
            <Link
                href={`/download/${downloadPath}`}
                method="get"
                type="button"
                className="hover:bg-sky-500 rounded"
            >

                {imageFormat.includes(file.split('.')[1]) ?
                    <img src={filePath} alt={file} className="w-84 p-2 " /> :
                    <FileIcon />}
            </Link>
        </div></>
    );
}
