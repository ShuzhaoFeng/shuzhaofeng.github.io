import JsonPathSerializerIcon from '../../../assets/JsonPathSerializerIcon.png'
import ReactViteTypescript from '../../../assets/ReactViteTypescript.png'
import Unity from '../../../assets/Unity.png'
import { GalleryItem } from '../galleryTypes'

const personal: GalleryItem[] = [
    {
        title: 'JsonPathSerializer',
        color: '#90e090',
        desc:
            'JsonPathSerializer is a class library that help C# code to build JSON objects incrementally,' +
            'each time with a JsonPath and a value.',
        image: JsonPathSerializerIcon,
        url: 'https://github.com/ShuzhaoFeng/JsonPathSerializer',
    },
    {
        title: 'shuzhaofeng.github.io',
        color: '#61dbfb',
        desc: 'Yes, I make this website',
        image: ReactViteTypescript,
        url: 'https://github.com/ShuzhaoFeng/shuzhaofeng.github.io',
    },
    {
        title: '魇 · Chimera',
        color: '#e37e02',
        desc:
            "A strategy game developed in Unity, with player's experience and freedom enhanced with powers of AI." +
            'This is my little secret...for now 🤫.',
        image: Unity,
    },
]

export default personal
