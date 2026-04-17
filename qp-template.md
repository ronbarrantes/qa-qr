# Put wall

## Singles issues

Picker {{Picker ID}} did not grab the item {{UPC}} {{Description}} from {{Shelf}}
Next time {{Picker ID}}, ensure you grab everything you need {{UPC}} and {{UPC}} and {{UPC}}

# Test
## Mixed Item Receipt Test
TOTE #{{tote}} | Item No. {{System UPC}} ({{Description}})
Multiple items were received into the same tote: ({{Sysematic Quantity}} units) of Item No. {{System UPC}} ({{Description}}) and ({{Physical Quantity}} units) of Item No. {{Physical UPC}} ({{Physical Item Desc}}). All items were received as Item No. {{System UPC}} ({{Description}}). Associate failed to verify all UPCs prior to receipt.
Qty in Error: {{Sysematic Quantity}} – {{Receiver Id}}


# Picking

## Invalid QA Lock
{{location}} | Item No. {{itemNumber}} ({{description}})
Product was present at the correct location, and the UPC scanned successfully. No actual issue was identified.
Qty in Error: {{qtyInError}} - {{associateId}}
NOTE: Associates are provided the last several digits of the product's UPC. Associates are expected to verify the UPC before flagging a location as an issue.

---

## Invalid Lock Due to Over Pick
{{location}} | Item No. {{itemNumber}} ({{description}})
Associate flagged the location for insufficient quantity; however, it was determined that the associate over-picked by {{overPickQty}} units and did not decant the case. Additional units were found on associate's cart. Inventory count was accurate once excess product was returned to the location.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Flagged Damage - No Damage Found
{{location}} | Item No. {{itemNumber}} ({{description}})
Item was not damaged. Product was unopened, uncut, and fully pickable/shippable.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Flagged Damage - Other Pickable Items at Location
{{location}} | Item No. {{itemNumber}} ({{description}})
Item was marked as damaged; however, additional non-damaged units were available and pickable at the same location.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Flagged Damage - Left Mess Behind
{{location}} | Item No. {{itemNumber}} ({{description}})
Item was marked as damaged. Associate did not clean the area or notify a lead/manager as required.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Picked From Wrong Location
{{location}} | Item No. {{itemNumber}} ({{description}})
Item was not picked from the system-directed location. Handheld pick instructions were not followed.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Tote Not Returned to Original Location
{{location}} | Item No. {{itemNumber}} ({{description}})
Tote was not returned to its original location after picking, resulting in a location discrepancy.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Over Pick
{{location}} | Item No. {{itemNumber}} ({{description}})
Item was over-picked by {{overPickQty}} units. Inventory count was accurate once excess product was returned to the location.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Over Pick - Failure to Decant
{{location}} | Item No. {{itemNumber}} ({{description}})
Associate was instructed to pick {{instructedQty}} unit(s); however, the full case was removed instead of the requested quantity. The system reflected the pick as correct, but the physical quantity was incorrect due to failure to decant.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Under Pick
{{location}} | Item No. {{itemNumber}} ({{description}})
Associate was instructed to pick {{instructedQty}} unit(s); however, fewer units were physically present on the cart. The system reflected the pick as correct, but the physical quantity was short.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Under Pick - Incorrect Decanting
{{location}} | Item No. {{itemNumber}} ({{description}})
Associate was instructed to pick one full case ({{caseQty}} units). Instead, the case was opened and only one unit was picked. The system reflected the pick as correct, but the physical pick was incomplete and did not meet order requirements.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Unsafe Picking - With Damage
{{location}} | Item No. {{itemNumber}} ({{description}})
Associate attempted to retrieve an item from the location using unsafe methods, causing the item to fall and resulting in product damage. Picks must be made using approved methods, including ladder use when outside the power zone or overweight.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Unsafe Picking - Without Damage
{{location}} | Item No. {{itemNumber}} ({{description}})
Associate picked from an unstable pallet configuration instead of using a ladder as outlined in training standards. This created a safety hazard and increased the risk of freight falling, though no damage occurred.
Qty in Error: {{qtyInError}} - {{associateId}}

---

## Damaged Item - Caused by Picker
{{location}} | Item No. {{itemNumber}} ({{description}})
Associate was assigned to pick Item No. {{itemNumber}} from the listed location. During the pick process, the associate identified and flagged an issue with the product; however, the item was left in a damaged condition. The damaged product was left in the location and the damage was not reported following the decanting process.
Qty in Error: {{qtyInError}} - {{associateId}}

---

# Packing

## Under Shipping
Pick Ticket #{{pickTicket}} | Cart #{{cartNumber}} | Item No. {{itemNumber}} ({{description}})
Packer failed to verify quantity, resulting in {{qtyInError}} unit(s) missing from the customer order. Per OB PR, this was confirmed as a shipping error.
Qty in Error: {{qtyInError}} – {{associateId}}

---

## Under Shipped - Decanting Error
Pick Ticket #{{pickTicket}} | Cart #{{cartNumber}} | Item No. {{itemNumber}} ({{description}})
Associate was instructed to ship 1 full case ({{caseQty}} units); however, only 1 unit was shipped. The system reflected the shipment as correct, but the physical quantity shipped was incorrect, resulting in the customer not receiving the full case as expected.
Qty in Error: {{qtyInError}} – {{associateId}}

---

## Over Shipping - Failure to Decant
Pick Ticket #{{pickTicket}} | Cart #{{cartNumber}} | Item No. {{itemNumber}} ({{description}})
Item was over-shipped by {{overShipQty}} units. Packer failed to decant product as required prior to shipping.
Qty in Error: {{qtyInError}} – {{associateId}}

---

## Mis-Ship (Piece of Set)
Pick Ticket #{{pickTicket}} | Cart #{{cartNumber}} | Item No. {{itemNumber}} ({{description}})
One individual unit was shipped instead of the required full case of {{caseQty}} units. Packer failed to verify correct ship quantity prior to shipment.
Qty in Error: {{qtyInError}} – {{associateId}}

---

## Wrong Item Shipped
Pick Ticket #{{pickTicket}} | Cart #{{cartNumber}} | Item No. {{itemNumber}} ({{description}})
Packer shipped incorrect item UPC {{shippedUpc}} instead of directed UPC {{directedUpc}}. Failed to verify correct UPC prior to shipping.
Qty in Error: {{qtyInError}} – {{associateId}}

---

# Pallet Receiving

## Wrong Item Received
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Product received did not match the SKU in the system. Associate failed to verify product before receiving. Item physically received did not match the UPC recorded in the system. Product verification at receipt was incorrect.
Qty in Error: {{qtyInError}} - {{receiverId}}

---

## Mixed Received Pallet
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Multiple items were received onto the same LPN: ({{item1Qty}} units) of Item No. {{item1Number}} ({{item1Description}}) and ({{item2Qty}} units) of Item No. {{item2Number}} ({{item2Description}}). All items were received as Item No. {{itemNumber}} ({{description}}). Associate failed to verify all UPCs prior to receipt.
Qty in Error: {{qtyInError}} - {{receiverId}}

---

## Over Received
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
More units were received than ordered on the PO. Physical quantity exceeded expected receipt quantity.
Qty in Error: {{qtyInError}} - {{receiverId}}

---

## Under Received
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Fewer units were received than expected based on the PO. Full pallet quantity was not received into the system.
Qty in Error: {{qtyInError}} - {{receiverId}}

---

## Under Received - Decanting
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Product was under-received due to incomplete decanting. Item contains {{innerPackQty}} inner packs per case, as labeled. Systematic quantity did not match physical quantity received.
Qty in Error: {{qtyInError}} - {{receiverId}}

---

## Received Damaged
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Product was received in damaged condition. Damaged freight should not be received into inventory.
Qty in Error: {{qtyInError}} - {{receiverId}}

---

## Under Received "Zero Crossing"
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Product was found in a location expected to be empty. System receipt did not match physical inventory, indicating under-receipt at dock.
Qty in Error: {{qtyInError}} - {{receiverId}}

---

## Under Received due to Decanting Error
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
System receipt reflected full quantity; however, product remained after decanting. Physical count did not match received quantity.
Qty in Error: {{qtyInError}} - {{receiverId}}

---

## Wrong Expiration Date
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Incorrect expiration date of {{enteredExpDate}} was entered at receipt. Actual expiration date of {{actualExpDate}} was verified upon review.
Qty in Error: {{qtyInError}} - {{receiverId}}

---

## Expiring Soon
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Product was received with an expiration date of {{expirationDate}}, indicating limited remaining shelf life and should have been rejected at dock due to quality and compliance risk.
Qty in Error: {{qtyInError}} - {{receiverId}}

---

## Bad UPC
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
UPC was not scannable on received units. Replacement UPC labels were required to complete processing.
Qty in Error: {{qtyInError}} - {{receiverId}}

---

## Similar Items Rec'd to Same Pallet
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Visually similar UPCs were received onto the same pallet, creating increased risk for downstream picking errors. Similar items should be segregated at receipt.
Qty in Error: {{qtyInError}} - {{receiverId}}

---

# Pallet Put Away

## Wrong Location – Systematic vs Physical Mismatch
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
LPN was systematically put away to {{systematicLocation}} but was physically found at {{physicalLocation}}.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Wrong Location – Only 1 LPN Systematically Put Away
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Two LPNs (LPN #{{lpn}} & LPN #{{pairedLpn}}) were on the same pallet at {{originalLocation}}, but only one LPN was systematically moved to {{destinationLocation}}. Physically, both LPNs were found at {{destinationLocation}}; however, LPN #{{lpn}} remained systemically at {{originalLocation}} and was flagged as missing.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Wrong Item Put Away
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Item systematically put away did not match the physical product. Incorrect item verified during put away.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Systematic Putaway to Invalid/Non-Existent Location
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
LPN was systematically put away to a non-existent location. The location does not physically exist and has no scannable barcode. Pallets must only be slotted after physically verifying the location. LPN remained under the associate's username and was later found at {{foundLocation}}.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Incorrect Put Away – Allocation Error
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
LPN was directively put away to {{originalLocation}}, then later moved both systemically and physically to {{destinationLocation}}. Allocations remained attached to {{originalLocation}}, preventing correct processing at {{destinationLocation}}. Once an LPN is slotted, allocations remain tied to the original location. Multiple system moves on the same LPN should not be performed.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Put Away in System But Not Found
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Driver logs show LPN was systematically put away to {{location}}. Physically, the LPN was not at the location, it was never picked from and could not be located.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Over Height – Unsafe Placement
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
LPN exceeded height limits for the assigned pickable location, creating accessibility and safety concerns.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Overweight for PS2
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
LPN exceeded the PS2 weight limit. Individual item weight was greater than 112 oz, posing a safety risk.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Product Placed on Floor – Same LPN
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Product from the same LPN was placed on the floor between pallets due to over-height freight. Product must never be stored on the floor.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Product on Floor – From Reload
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
During a reload, existing product at {{location}} was placed on the floor between pallets. Product must never be stored on the floor.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Multiple UPCs in PRM Location
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Multiple UPCs were placed into the same PRM location. PRM locations are restricted to one UPC only.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Shrink Wrap Not Removed
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Shrink wrap was not removed from the LPN during put away, creating picking and access issues.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Similar Items on Same Pallet
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Visually similar UPCs were stored on the same pallet, increasing the risk of mis-picks. Similar items must not be stored together.
Qty in Error: {{qtyInError}} – {{driverId}}

---

## Double Stacked Pallets on PS2
LPN #{{lpn}} | Item No. {{itemNumber}} ({{description}})
Freight was placed on top of an empty pallet in a PS2 location. Double stacking is not permitted and presents a safety hazard.
Qty in Error: {{qtyInError}} – {{driverId}}

---

# Tote Receiving

## Wrong Item Received
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
Product received systematically did not match the physical product. Incorrect item verified at tote receipt.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Mixed Item Receipt
TOTE #{{tote}} | Item No. {{System UPC}} ({{Description}})
Multiple items were received into the same tote: ({{Sysematic Quantity}} units) of Item No. {{System UPC}} ({{Description}}) and ({{Physical Quantity}} units) of Item No. {{Physical UPC}} ({{Physical Item Desc}}). All items were received as Item No. {{System UPC}} ({{Description}}). Associate failed to verify all UPCs prior to receipt.
Qty in Error: {{Sysematic Quantity}} – {{Receiver Id}}

---

## Mixed Items – Clothing
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
Tote contained multiple clothing sizes: ({{size1Qty}} units) of Size {{size1}} and ({{size2Qty}} units) of Size {{size2}}. All units were received as Size {{receivedAsSize}}. Clothing UPCs must be verified prior to receipt.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Similar Items in Same Tote
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
Item No. {{item1Number}} ({{item1Description}})
Item No. {{item2Number}} ({{item2Description}})
Visually similar items were placed into the same tote upon receipt, increasing the risk of mis-picks.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Wrong Expiration Date
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
Expiration date entered at receipt did not match the physical product. Dates must be verified during tote receipt.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Under Received
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
System reflected fewer units received than physically present in the tote. Associate failed to verify quantity at receipt.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Under Received – Decanting Error
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
Product was under-received due to incomplete decanting. Item contains {{innerPackQty}} inner packs per case, as labeled. Systematic quantity did not match physical quantity received.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Over Received
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
More units were received than physically present or ordered. Associate failed to verify tote quantity prior to receipt.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Over Received – Decanting
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
Product was received by inner pack instead of by case, resulting in an over-receipt. Associate improperly decanted and scanned individual packs instead of the full case.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Over Received – Over 5 SKUs in Tote
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
Item No. {{item2Number}} ({{item2Description}})
Item No. {{item3Number}} ({{item3Description}})
Item No. {{item4Number}} ({{item4Description}})
Item No. {{item5Number}} ({{item5Description}})
Tote exceeded the 5-UPC limit. Multiple UPCs were received into a single tote, violating tote standards (IB Tote AWI, Page 7, Step 9).
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Duplicate Receipt – Same Tote
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
UPC was received multiple times into the same tote, creating an overage on the PO.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Decanting Error – Correct Qty Received
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
Correct quantity was received; however, items were not properly decanted (still packaged in inner packs). Decanting is required upon tote receipt.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Bad UPC
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
UPC was not scannable on received units. Replacement UPC labels were required to complete processing.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Bad UPC – No UPC Present
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
No UPC was present on the product or outer packaging. New UPC labels were required for receipt and picking.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Bad UPC – Covered UPC
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
UPC was covered by packaging or labels, preventing successful scanning and creating downstream picking issues.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Bad UPC – Conflicting UPCs
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
Product contained multiple UPCs (product vs packaging). Incorrect UPC was received, resulting in false locks and inventory discrepancies.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## FTS Error – Not Bagged/Taped, Damage Present
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
Chemical product was not bagged or taped at receipt, resulting in product damage. FTS standards require proper bagging and taping.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## FTS Error – Not Bagged/Taped, No Damage
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
Chemical product was not bagged or taped at receipt, increasing the risk of damage. Bagging and taping is required per FTS standards.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

## Received Damaged
TOTE #{{tote}} | Item No. {{itemNumber}} ({{description}})
Product was received into inventory in damaged condition. Damaged items must not be received.
Qty in Error: {{qtyInError}} – {{receiverId}}

---

# Tote Put Away

## Wrong Item Put Away
{{location}} | Item No. {{itemNumber}} ({{description}})
Product systematically put away did not match the physical product. Incorrect item verified during tote put away.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Mixed Items – Non-Clothing
{{location}} | Item No. {{itemNumber}} ({{description}})
Tote contained multiple items, ({{item1Qty}} units) of Item No. {{item1Number}} ({{item1Description}}) and ({{item2Qty}} units) of Item No. {{item2Number}} ({{item2Description}}). All items were verified as Item No. {{itemNumber}} ({{description}}). Associate failed to verify all UPCs prior to put away.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Mixed Items – Clothing
{{location}} | Item No. {{itemNumber}} ({{description}})
Tote contained multiple clothing sizes: ({{size1Qty}} units) of Size {{size1}} and ({{size2Qty}} units) of Size {{size2}}. All units were verified as Size {{verifiedAsSize}}. Clothing UPCs must be verified prior to receipt.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Wrong Location
{{location}} | Item No. {{itemNumber}} ({{description}})
Product was systematically put away to {{systematicLocation}} but was found at {{physicalLocation}}.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Wrong Location - Transfer Error
{{location}} | Item No. {{itemNumber}} ({{description}})
Associate initiated a system transfer from {{originalLocation}} to {{destinationLocation}}; however, the physical transfer did not occur. Product remained at {{originalLocation}}, creating a system vs physical mismatch.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Systematically But Not Physically
{{location}} | Item No. {{itemNumber}} ({{description}})
Product was systematically put away but not physically located in the assigned location. Item was flagged as missing and never picked from the recorded location.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Systematically Put Away – Later Found at PR
{{location}} | Item No. {{itemNumber}} ({{description}})
Product was flagged missing but was found on a cart and returned to PR area. Item was returned to systematic location.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Systematically Put Away – Re-Received to PR
{{location}} | Item No. {{itemNumber}} ({{description}})
Product was systematically put away but not physically. Tote was returned to IB where it was re-received, causing PO overage.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Systematically Put Away – Still Attached to Cart
{{location}} | Item No. {{itemNumber}} ({{description}})
Tote was systematically placed into a location but remained physically attached to the cart. Another associate later completed put away to another location.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Physically Put Away – Not Systematically
{{location}} | Item No. {{itemNumber}} ({{description}})
Tote was physically placed into a location without a system update, resulting in inventory mismatch.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Physically Put Away – Still Attached to Cart
{{location}} | Item No. {{itemNumber}} ({{description}})
Tote was physically put away but remained system-linked to the delivery cart.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Incorrect Quantity – Under
{{location}} | Item No. {{itemNumber}} ({{description}})
Systematic quantity did not match physical quantity. Quantity was not verified prior to put away.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Incorrect Quantity – Under (Decanting)
{{location}} | Item No. {{itemNumber}} ({{description}})
Product was under-stocked due to incomplete decanting. Inner packs per case were not fully processed before shelving.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Incorrect Quantity – Over
{{location}} | Item No. {{itemNumber}} ({{description}})
System showed more units put away than physically present. Receiving or verification error confirmed.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Incorrect Quantity – Over (Decanting)
{{location}} | Item No. {{itemNumber}} ({{description}})
Improper decanting caused an over-receipt that was not identified prior to shelving.
Qty. in Error: {{qtyInError}} – {{stockerId}}

---

## Incorrect Quantity – Duplicate Put Away
{{location}} | Item No. {{itemNumber}} ({{description}})
UPC was correctly received but put away twice in the system, creating inaccurate inventory.
Qty. in Error: {{qtyInError}} – {{stockerId}}
