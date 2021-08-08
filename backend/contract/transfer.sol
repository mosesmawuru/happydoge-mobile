pragma solidity >=0.7.0 <0.9.0;


contract Send {

 event Sent(address from, address to, uint amount );

 function send(address payable _receiver, uint _amount) public payable{
    _receiver.transfer(_amount);
    emit Sent(msg.sender, _receiver, _amount);
 }
}