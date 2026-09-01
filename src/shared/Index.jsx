import { Link } from "react-router-dom";

const products = [
    {
        id: 1,
        name: "AeroFlex Runner",
        category: "Running",
        price: 129,
        originalPrice: 169,
        rating: 4.8,
        badge: "Best Seller",
        colors: ["Midnight", "Sand", "Coral"],
        description: "Responsive cushioning and breathable knit designed for all-day comfort.",
    },
    {
        id: 2,
        name: "Summit Backpack",
        category: "Travel",
        price: 98,
        originalPrice: 128,
        rating: 4.9,
        badge: "New",
        colors: ["Slate", "Olive", "Stone"],
        description: "Smart storage with padded straps for workdays, commutes, and adventures.",
    },
    {
        id: 3,
        name: "Luma Smart Lamp",
        category: "Home",
        price: 74,
        originalPrice: 94,
        rating: 4.7,
        badge: "Top Rated",
        colors: ["Pearl", "Graphite", "Honey"],
        description: "Warm ambient lighting with touch controls and a minimalist silhouette.",
    },
];

const Index = () => {
    return (
        <div className="storefront-shell">
            <header className="topbar">
                <div className="brand-block">
                    <span className="brand-mark">R</span>
                    <span>Retail Platform</span>
                </div>

                <nav className="main-nav" aria-label="Main navigation">
                    <a href="#shop">Shop</a>
                    <a href="#features">Features</a>
                    <a href="#reviews">Reviews</a>
                </nav>

                <div className="nav-actions">
                    <Link to="/auth/login" className="nav-link">Login</Link>
                    <button type="button" className="primary-btn compact-btn">Checkout</button>
                </div>
            </header>

            <main>
                <section className="hero-section">
                    <div className="hero-copy">
                        <p className="eyebrow">Fresh essentials for everyday life</p>
                        <h1>Built for shoppers who want less friction and more value.</h1>
                        <p className="hero-text">
                            Clean design, quick decisions, and a smoother buying journey help your customers move from browsing to checkout with confidence.
                        </p>

                        <div className="cta-row">
                            <button type="button" className="primary-btn">Shop now</button>
                            <button type="button" className="secondary-btn">View collection</button>
                        </div>

                        <ul className="mini-stats" aria-label="Shopping benefits">
                            <li><strong>2-day</strong><span>delivery</span></li>
                            <li><strong>4.9/5</strong><span>happy shoppers</span></li>
                            <li><strong>24/7</strong><span>support</span></li>
                        </ul>
                    </div>

                    <div className="hero-visual" aria-label="Featured product showcase">
                        <div className="visual-card feature-card main-product">
                            <span className="pill">New arrival</span>
                            <div className="product-image placeholder-one">
                                <div className="product-shape" />
                            </div>
                            <div className="feature-card-copy">
                                <h3>AeroFlex Runner</h3>
                                <p>Lightweight, cushioned, and ready for every route.</p>
                                <div className="feature-meta">
                                    <strong>$129</strong>
                                    <span>Free shipping</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="value-strip" id="features">
                    <div>
                        <span>✔ Fast checkout</span>
                    </div>
                    <div>
                        <span>✔ Simple returns</span>
                    </div>
                    <div>
                        <span>✔ Secure payments</span>
                    </div>
                    <div>
                        <span>✔ Mobile ready</span>
                    </div>
                </section>

                <section className="product-section" id="shop">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Popular picks</p>
                            <h2>Best-selling essentials</h2>
                        </div>
                        <button type="button" className="secondary-btn">Browse all</button>
                    </div>

                    <div className="product-grid">
                        {products.map((product) => (
                            <article key={product.id} className="product-card">
                                <div className="product-card-header">
                                    <span className="product-badge">{product.badge}</span>
                                    <span className="rating">★ {product.rating}</span>
                                </div>

                                <div className={`product-image ${product.id === 1 ? "placeholder-one" : product.id === 2 ? "placeholder-two" : "placeholder-three"}`}>
                                    <div className="product-shape" />
                                </div>

                                <div className="product-details">
                                    <div className="product-meta">
                                        <span>{product.category}</span>
                                        <span>{product.colors.length} colors</span>
                                    </div>

                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>

                                    <div className="color-options" aria-label={`${product.name} colors`}>
                                        {product.colors.map((color) => (
                                            <button key={color} type="button" className="color-chip" aria-label={color}>
                                                {color}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="card-footer">
                                        <div className="price-wrap">
                                            <strong>${product.price}</strong>
                                            <span>${product.originalPrice}</span>
                                        </div>

                                        <button type="button" className="primary-btn compact-btn">Add to Cart</button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="promo-banner" id="reviews">
                    <div>
                        <p className="eyebrow">Why shoppers stay</p>
                        <h2>Thoughtful design that keeps buying easy.</h2>
                    </div>

                    <div className="promo-points">
                        <div>
                            <strong>Simple product choices</strong>
                            <span>Side-by-side options remove hesitation.</span>
                        </div>
                        <div>
                            <strong>High-contrast actions</strong>
                            <span>Bright CTAs are visible without hunting.</span>
                        </div>
                        <div>
                            <strong>Mobile-first flow</strong>
                            <span>Menus and details stay easy to tap on smaller screens.</span>
                        </div>
                    </div>
                </section>

                <section className="checkout-cta">
                    <div>
                        <p className="eyebrow">Ready to shop?</p>
                        <h2>Make the final step feel effortless.</h2>
                    </div>
                    <button type="button" className="primary-btn">Proceed to Checkout</button>
                </section>
            </main>
        </div>
    );
};

export default Index;