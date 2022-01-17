//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

contract Library {

// contract @ 0x8CAcCed6376E6c2D9Af019c872EE91C414fB86f4

    mapping(uint => Book) public books;
    mapping(address => Member) public members;

    struct Book {
        string title;
        string author;
        bool borrowed;
        address currentBorrower;
    }
    struct Borrowing {
        uint bookISBN;
        uint256 borrowTime;
        uint256 returnTime;
    }
     struct Member {
        address memberAddr;
        uint numBooks;
        mapping (uint256 => Borrowing) myBorrowing;
    }

    function addBook(uint _isbn, string memory _title, string memory _author) public {
        books[_isbn] = Book(_title, _author, false, 0x0000000000000000000000000000000000000000);
    }
    function addMember() public {
        members[msg.sender] = Member (msg.sender, 0);
    }
    function addMemberBorrow(uint _isbn) public {
        members[msg.sender].myBorrowing[members[msg.sender].numBooks] = Borrowing({
             bookISBN: _isbn,
             borrowTime: block.timestamp,
             returnTime: 0 });
        members[msg.sender].numBooks++;
        books[_isbn].borrowed = true;
        books[_isbn].currentBorrower = msg.sender;
    }

    function getMemberBorrows() public view returns (Borrowing[] memory) {
        uint256 _len = members[msg.sender].numBooks;
        Borrowing[] memory _list = new Borrowing[](_len);
        for(uint256 i = 0; i < _len; i++){
            _list[i] =  members[msg.sender].myBorrowing[i];
        }
        return _list;
    }
}