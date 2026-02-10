import { useContent } from '../hooks/useContent';
import '../styles/contact.css';

const ContactPage = () => {
    const { content } = useContent();
    const whatsappClean = content?.whatsappNumber?.replace(/\+/g, '') || '918780055674';

    return (
        <div className="contact-page">
            <div className="contact-container">
                <header className="contact-header">
                    <h1 className="contact-title">Contact Our Family</h1>
                    <p className="contact-subtitle">We are here to help you find your perfect saree.</p>
                </header>

                <div className="contact-grid">
                    <div className="contact-info">
                        <section className="contact-info__section">
                            <h2 className="contact-info__title">Visit Our Surat Studio</h2>
                            <p className="contact-info__text">
                                Avira Vastra Studio<br />
                                Ring Road, Surat, Gujarat 395002<br />
                                India
                            </p>
                        </section>

                        <section className="contact-info__section">
                            <h2 className="contact-info__title">Call or WhatsApp</h2>
                            <p className="contact-info__text">
                                <a href={`tel:${content?.whatsappNumber || '+918780055674'}`}>{content?.whatsappNumber || '+91 87800 55674'}</a> (Sales Support)<br />
                                <a href={`https://wa.me/${whatsappClean}`} target="_blank" rel="noopener noreferrer">WhatsApp Us Directly</a>
                            </p>
                        </section>

                        <section className="contact-info__section">
                            <h2 className="contact-info__title">Email Us</h2>
                            <p className="contact-info__text">
                                <a href={`mailto:${content?.footerEmail || 'help@aviravastra.com'}`}>{content?.footerEmail || 'help@aviravastra.com'}</a>
                            </p>
                        </section>
                    </div>

                    <div className="contact-form-container">
                        <form className="contact-form">
                            <div className="contact-form__group">
                                <label>Your Name</label>
                                <input type="text" placeholder="Full Name" required />
                            </div>
                            <div className="contact-form__group">
                                <label>Email Address</label>
                                <input type="email" placeholder="example@email.com" required />
                            </div>
                            <div className="contact-form__group full-width">
                                <label>Subject</label>
                                <select>
                                    <option>General Inquiry</option>
                                    <option>Order Support</option>
                                    <option>Wholesale/Bulk</option>
                                    <option>Saree Selection Help</option>
                                </select>
                            </div>
                            <div className="contact-form__group full-width">
                                <label>Message</label>
                                <textarea rows="4" placeholder="How can we help you today?"></textarea>
                            </div>
                            <button type="submit" className="contact-submit">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
