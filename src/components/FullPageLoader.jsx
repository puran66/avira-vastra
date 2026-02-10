import '../styles/full-page-loader.css';

const FullPageLoader = ({ message = "Processing..." }) => {
    return (
        <div className="full-page-loader">
            <div className="full-page-loader__content">
                <div className="lux-spinner">
                    <div className="lux-spinner__circle"></div>
                    <div className="lux-spinner__circle"></div>
                </div>
                <p className="full-page-loader__text">{message}</p>
            </div>
        </div>
    );
};

export default FullPageLoader;
