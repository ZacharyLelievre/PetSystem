drop table shelters if exists;
create table shelters
(

    id         INT NOT NULL AUTO_INCREMENT,
    shelterid VARCHAR(36) NOT NULL UNIQUE,
    name       VARCHAR(255) NOT NULL,
    location   VARCHAR(255) NOT NULL,
    imageURL   VARCHAR(255),
    PRIMARY KEY (id)
);
drop table pets if exists;
create table pets
(
    id          INT NOT NULL AUTO_INCREMENT,
    petid     VARCHAR(36) NOT NULL UNIQUE,
    name       VARCHAR(255) NOT NULL,
    type       VARCHAR(255) NOT NULL,
    breed       VARCHAR(255) NOT NULL,
    age         INT NOT NULL,
    shelterid  VARCHAR(36) ,
    posterURL   VARCHAR(255),

    PRIMARY KEY (id),
    FOREIGN KEY (shelterid) references shelters(shelterid)
);