import Cybersight from '../../../assets/cybersight.jpg'
import HotelManagementApp from '../../../assets/hotel-management-app.png'
import BikeTourPlus from '../../../assets/bike-tour-plus.png'
import { GalleryItem } from '../galleryTypes'

const school: GalleryItem[] = [
    {
        title: 'Cybersight',
        color: '#0394fc',
        desc:
            'An innovative technological solution aimed at enhancing the shopping experience for blind' +
            " and visually impaired (BVI) individuals. Developed under the context of of McGill Software Engineering's Capstone project," +
            ' under supervision of Prof. Jeremy Cooperstock.',
        image: Cybersight,
        url: 'https://srl.mcgill.ca/projects',
    },
    {
        title: 'Hotel Management Application',
        color: '#4a76d4',
        desc:
            'A Hotel Management Application made with MVC architecture, using PostgreSQL as the database, Java Spring Boot as the backend, and React.js as the frontend. ' +
            'Developed as coursework for ECSE 321: Introduction to Software Engineering at McGill University.',
        image: HotelManagementApp,
    },
    {
        title: 'BikeTourPlus',
        color: '#e46b04',
        desc: 'A bike tour management desktop application made with Java and JavaFX. Developed as coursework for ECSE 223: Model-Based Programming at McGill University.',
        image: BikeTourPlus,
    },
]

export default school
