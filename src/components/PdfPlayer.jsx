import { useState } from 'react';
import { Document, Page } from 'react-pdf';

export default function PdfPlayer(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    
    return (
        <div className='pdf-container'>
            <Document file = {props.file} onLoadSuccess = { onDocumentLoadSuccess }>
                <Page pageNumber ={ pageNumber } />
            </Document>
            <div className="page-controls">
                <button type='button' onClickk={() => setPageNumber((prev_num) => prev_num - 1)}>left</button>
                <span>{ pageNumber } of { numPages }</span>
                <button type='button' onClickk={() => setPageNumber((prev_num) => prev_num + 1)}>right</button>
            </div>
        </div>
    );
}
