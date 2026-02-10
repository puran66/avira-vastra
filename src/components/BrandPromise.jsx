/**
 * BrandPromise Component
 * Premium Traditional Saree Brand - Mobile First
 * Quiet confidence and long-term trust
 */

import '../styles/brand-promise.css';

const BrandPromise = () => {
    const promises = [
        {
            id: 'quality',
            title: 'Handpicked with Care',
            description: 'Every saree is personally selected for its weave, finish, and lasting beauty.'
        },
        {
            id: 'packaging',
            title: 'Premium Packaging',
            description: 'Your saree arrives carefully packed, ready to be gifted or treasured.'
        },
        {
            id: 'exchange',
            title: 'Easy Exchange',
            description: '7-day exchange for unworn sarees, because your peace of mind matters to us.'
        },
        {
            id: 'values',
            title: 'Family-Run Values',
            description: 'We treat every order as if it were meant for our own mother or sister.'
        }
    ];

    return (
        <section className="brand-promise">
            <div className="brand-promise__container">

                {/* Section Header */}
                <div className="brand-promise__header">
                    <h2 className="brand-promise__title">The AviraVastra Promise</h2>
                    <p className="brand-promise__subtitle">
                        What you can expect from us, always
                    </p>
                </div>

                {/* Promise Points */}
                <div className="brand-promise__list">
                    {promises.map((promise) => (
                        <div key={promise.id} className="promise-item">
                            <h3 className="promise-item__title">{promise.title}</h3>
                            <p className="promise-item__description">{promise.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default BrandPromise;
