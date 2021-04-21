import Button from '@material-ui/core/Button';
//types
import { ItemType } from '../App';
//styles
import { Wrapper } from './item.styles';

type Props = {
    item: ItemType;
    addToCart: (selectedItem: ItemType) => void;
    
}
const Item: React.FC<Props> = ({ item, addToCart }) => (
    <Wrapper>
        <img src={item.image} alt={item.title}/>
        <div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() => addToCart(item)}> Add to Cart</Button>
    </Wrapper>
)

export default Item