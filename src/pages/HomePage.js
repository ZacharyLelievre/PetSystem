import './HomePage.css';


export default function HomePage() {
    return (
        <div className='homepage-container'>
            <header className="homepage-header">
                <h1>Welcome to Our Animal Shelter</h1>
                <p>Caring for the community's animals since 2003.</p>
                {/* Header Image */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Labrador_Retriever_-_Yellow.JPG" alt="Welcoming Image" className="header-image"/>
            </header>

            <section className="mission-statement">
                <h2>Our Mission</h2>
                <p>
                    At Zachary's Shelter, we are dedicated to rescuing, caring for, and finding forever homes for 
                    neglected and abandoned animals. Our goal is to nurture and rehabilitate these animals 
                    and provide them with the love and care they deserve.
                </p>
                {/* Mission Image */}
                <img src="https://d3544la1u8djza.cloudfront.net/APHI/Blog/2016/10_October/persians/Persian+Cat+Facts+History+Personality+and+Care+_+ASPCA+Pet+Health+Insurance+_+white+Persian+cat+resting+on+a+brown+sofa-min.jpg" alt="Mission Image" className="mission-image"/>
            </section>

            <section className="animal-gallery">
                <h2>Meet Our Animals</h2>
                <div className="gallery">
                    <img src="https://www.shutterstock.com/image-photo/adult-golden-retriever-dog-sitting-600nw-2424936765.jpg" alt="Dog" className="animal-image"/>
                    <img src="https://www.zooplus.ch/fr/magazine/wp-content/uploads/2018/08/maine-coon-3.jpg" alt="Cat" className="animal-image"/>
                    {/* More images can be added here */}
                </div>
            </section>

            {/* Other sections remain the same */}
            
        </div>
    )
}
