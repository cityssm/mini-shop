create schema MiniShop
go

create table MiniShop.Orders (
	orderID     bigint primary key identity,
	orderNumber varchar(50)      not null unique,
	orderSecret uniqueidentifier not null default newid(),
	orderTime   datetime         not null default getdate(),

	shippingName       nvarchar(100) not null,
	shippingAddress1   nvarchar(100),
	shippingAddress2   nvarchar(100),
	shippingCity       nvarchar( 50),
	shippingProvince   nvarchar( 20),
	shippingCountry    nvarchar( 20),
	shippingPostalCode nvarchar( 20),

	shippingEmailAddress       nvarchar(50) not null,
	shippingPhoneNumberDay     nvarchar(50),
	shippingPhoneNumberEvening nvarchar(50),

	paymentTime datetime,
	paymentID   nvarchar(50),

	refundTime   datetime,
	refundID     nvarchar(50),
	refundUser   nvarchar(20),
	refundReason nvarchar(50),

	deleteTime   datetime,
	deleteUser   nvarchar(20),
	deleteReason nvarchar(50),

	orderIsPaid     as cast(case when paymentTime is null then 0 else 1 end as bit) persisted,
	orderIsRefunded as cast(case when refundTime  is null then 0 else 1 end as bit) persisted,
	orderIsDeleted  as cast(case when deleteTime  is null then 0 else 1 end as bit) persisted
)

create table MiniShop.OrderItems (
	orderID   bigint  not null,
	itemIndex tinyint not null,

	productSKU varchar(20) not null,
	unitPrice money   not null,
	quantity  tinyint not null default 1,
	itemTotal as unitPrice * quantity,

	primary key (orderID, itemIndex),
	foreign key (orderID)
		references MiniShop.Orders (orderID)
		on update no action
		on delete no action
)

create table MiniShop.OrderItemFields (
	orderID   bigint  not null,
	itemIndex tinyint not null,
	formFieldName varchar(30) not null,
	fieldValue nvarchar(max) not null,

	primary key (orderID, itemIndex, formFieldName),
	foreign key (orderID, itemIndex)
		references MiniShop.OrderItems (orderID, itemIndex)
		on update no action
		on delete no action
);

create table MiniShop.OrderFees (
	orderID bigint      not null,
	feeName varchar(20) not null,

	feeTotal money not null,

	primary key (orderID, feeName),
	foreign key (orderID)
		references MiniShop.Orders (orderID)
		on update no action
		on delete no action
)

create table MiniShop.PaymentData (
	orderID bigint not null,
	dataName varchar(30) not null,
	dataValue nvarchar(max) not null,

	primary key (orderID, dataName),
	foreign key (orderID)
		references MiniShop.Orders (orderID)
		on update no action
		on delete no action
)