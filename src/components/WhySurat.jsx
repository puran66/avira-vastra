/**
 * WhySurat Component
 * Premium Traditional Saree Brand - Mobile First
 * Calm authority and value justification
 */

import '../styles/why-surat.css';

const WhySurat = () => {
    return (
        <section className="why-surat">
            <div className="why-surat__container">

                <h2 className="why-surat__title">Why Surat?</h2>

                <div className="why-surat__text">
                    <p>
                        Surat is the heart of India's textile craftsmanship.<br />
                        For generations, families across India have trusted Surat<br />
                        for quality, consistency, and value.
                    </p>

                    <p>
                        At AviraVastra, we bring you sarees directly from Surat weavers.<br />
                        There are no middlemen here. Just the purest weaves at the fairest price.
                    </p>

                    <p>
                        When you buy from the source,<br />
                        you buy with confidence.
                    </p>
                </div>

                <p className="why-surat__reassurance">
                    Trusted by families across India.
                </p>

            </div>
        </section>
    );
};

export default WhySurat;
