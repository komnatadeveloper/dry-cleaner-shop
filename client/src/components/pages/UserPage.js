import React, {useEffect} from 'react'

const UserPage = ({match}) => {
  //match.params.userId
  useEffect(() => {
    console.log(match);
  }, [])

  return (
    <div>
      This is User Page

      This is Collapsible
      {/* <ul class="collapsible">
        <li>
          <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
          <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
          <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
          <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
          <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
          <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
      </ul> */}

      

      <hr />
      <hr />
      <hr />


      <table className="striped highlight">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr style={{height: "15px"}}>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.8777</td>
          </tr>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
        </tbody>
      </table>


      


      

    </div>
  )
}

export default UserPage;
