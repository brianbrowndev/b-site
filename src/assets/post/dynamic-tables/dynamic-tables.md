Modifications of a map layout are not limited to what the user can do in ArcMap. The ArcPy  [mapping module](http://resources.arcgis.com/en/help/main/10.1/index.html#/Introduction_to_arcpy_mapping/00s300000032000000/)  offers
some powerful tools not just for manipulating layers but for changing the appearance and content of elements on a map
document.

The code and documentation below demonstrates how to construct tables on a map that respond to the current page in 
Data  Driven Pages and the data relative to that specific page. While the code is relatively simple, there are some 
components of python such as list comprehensions, classes that you should be familiar with as well as knowledge of 
ArcPy's cursor and mapping module.

Let's run through an example and the setup to below to see how this all works.

#### Real World Example

A few years ago I worked on a transportation project where impacts to wetlands were mapped along a 3 mile road 
corridor. Since the map contained an extensive amount of layers relating to all parts of the road project, the scale 
was very large, 1:50ft, to capture all those details. 

On each map, it was required to show the acreage of impacts to the wetlands within the map extent. Since each map had
 a varying number of wetlands, types, etc. a dynamic table was needed. 
 
This was amplified by the fact that the impacts to the wetlands could change any number of times throughout the 
 project. Meaning my sanity would lost if I had to manage that through 20 separate mxds for each map.

So I made some dynamic maps:
 
<div class="img-wrapper">
    <img src="/images/posts/dynamic_tables/page_1.jpg">
    <span class="img-title">The Impact Area Summary indicates all impacts on the map</span>
</div>
<div class="img-wrapper">
    <img src="/images/posts/dynamic_tables/page_2.jpg">
    <span class="img-title">In the next map, the table is updated to reflect impacts in the new extents</span>
</div>

As shown, a new table is drawn on each map through ArcPy, which queries a wetlands layer for all the features on the 
map and adds them to the table.

The result is one mxd and any updates to the table are made through the feature class. Much more preferred.

#### The Setup

For any data driven pages setup you need an index layer. The index layer is a set of features that will be cycled 
through to produce multiple maps based on the extent of the feature or a scale defined in index layer's attribute table.

Within your mxd you will need to enable data driven pages on a layer and set the "Name Field" parameter. This "Name 
Field" will be a key component later on in querying your table (i.e. dbf).

The next phase of setup all happens within the "Layout View" of your mxd. Once there, you need to establish where 
your table is going to go on your map and then construct the first row or header of your table.

First we start with our header elements as rectangular text boxes and two empty rectangular text box cells below the 
header which will start the first row in our table:

| Building Name     | Square Feet   |
| :---------------: | :-----------: |
| [EMPTY CELL]      | [EMPTY CELL]  |


With the header and first empty row complete, you will need to then right click each cell, go to "Properties" and 
under the tab "Size and Position" provide a name for the parameter "Element Name".

The name will need to be spelled exactly as it is named in the attribute table to match i.e. "Building_Name." If an 
element does not have a name, the script will pass over it.

This table is the data that needs to be displayed on the map. The following example sheds some light on what this 
would look like.

#### Looking at Sectors

We have sectors in an unknown township. There are five of these sectors, and the aim is to produce five different 
maps listing all the buildings by their name and their square footage in a table on the map.

 So what we are working with is...

- A "Sectors" feature class with 5 sectors with an attribute table of:

| Sector_Name            |
| :--------------------: |
| One                    |
| Two                    |
| Three                  |
| Four                   |
| Five                   |

- A "Buildings" feature class with a variable number of buildings within each sector, with an attribute table of:

| Building_Name     | Square_Feet   |
| :---------------: | :-----------: |
| The Brown         | 20,000        |
| Pigeon Hole       | 200           |
| Aces              | 576           |
| Hull and Husk     | 10            |
| Dynamite Den      | 900           |
| Rubee Den         | 55            |
| Buyer's Remorse   | 10,000        |

The first task would be to setup a the "Sectors" feature class as an index layer in data driven pages and pass the 
"Sector_Name" to the parameter "Name Field." This means as we scroll through the data driven pages the name of each 
map will be associated with the Sector Name.

Then in an mxd under "Layout View" we set up the header of and the empty cells, which are given element names of 
"Building_Name" and "Square_Feet" as we have in the attribute table of the "Buildings" feature class.

From here, we run an intersect in GIS with the "Buildings" and "Sectors" feature class to generate a table of all 
buildings by sector.

This table appears as:

| Sector_Name | Building_Name     | Square_Feet   |
| :---------: | :---------------: | :-----------: |
| One         | The Brown         | 20,000        |
| One         | Pigeon Hole       | 200           |
| One         | Aces              | 576           |
| Two         | Hull and Husk     | 10            |
| Two         | Dynamite Den      | 900           |
| Two         | Rubee Den         | 55            |
| Two         | Buyer's Remorse   | 10,000        |

And so forth. What we want to show, then, is as data driven pages exports out each map, all the corresponding rows 
with that map should be displayed.

If we succeed, we will find some nice tables generated with the precision and love you deserve.

###### Sector 1 Map

| Building Name     | Square Feet   |
| :---------------: | :-----------: |
| The Brown         | 20,000        |
| Pigeon Hole       | 200           |
| Aces              | 576           |

###### Sector 2 Map

| Building Name     | Square Feet   |
| :---------------: | :-----------: |
| Hull and Husk     | 10            |
| Dynamite Den      | 900           |
| Rubee Den         | 55            |
| Buyer's Remorse   | 10,0000       |

#### Putting it Together

When the script is executed, it will start on the first page of the data driven pages, look at 'Name Field' of the 
index layer and find the "Sector_Name" field and the current page we are on, Sector One.

It will then query the field "Sector_Name" in the table we passed to the script for all Sector One rows. With these 
rows, it will match up any fields in the table that match the names of elements in our mxd. So if a field is named 
"Building_Name" it will find these elements and start constructing the table. Then it will go to the next field 
'Square_Feet', and add the appropriate values.

Once the table is complete for Sector One a pdf will be exported, the mxd refreshed, and Sector Two will begin.

The key to the success of this script is maintaining the links between your data. If the index layer has a field 
"Sector_Names" while your table has a field "Sector_Name", the script won't run. If any of your elements have 
different names then the corresponding fields in the attribute table then they won't be displayed.

It's all about consistency.
#### Behind the Scenes

How is this table being constructed? Let's dig in and take a look.

The first take is to get the elements on a map page. This can be done with a simple list of the layout elements such as:

```python
map_doc = arcpy.mapping.MapDocument(path_to_mxd)
arcpy.mapping.ListLayoutElements(map_doc, element_type)
```

First we initialize our mxd and then use [ListLayoutElements](http://resources.arcgis.com/en/help/main/10.1/index
.html#//00s30000003w000000) to list all elements of a given "element_type". There are a number of element types but 
the one we want to list is the "TEXT_ELEMENT."

This gives of a list of all objects associated with that element. In this way, with the help of some python 
shorthand, we can quickly make a list of tuples with the object name and the object via a list comprehension:

```python
element_map = [(str(obj.name), obj) for obj in arcpy.mapping.ListLayoutElements(map_doc, element_type)
if len(str(obj.name)) > 0]
```

What we are doing is looping through the layout elements and filtering out any elements that do not have a name 
(think back to above when we went through and named elements with corresponding field names from our attribute table)
. We then append to our list a tuple with the name of the object and the object.

In our example the list appears as:

```python
[
("Building_Name", <text object>),
("Square_Feet", <text object>)
]
```

With this list in hand, we can initiate a cursor on our table. If a field matches an element, their are properties 
and methods in an element we can utilize to make a new cell in our table.

| Building Name     |
| :---------------: |
| [EMPTY CELL]      |

Since our first cell is already created, there's little work to down except set the content of the cell.

```python
<text object>.text = "Sad Ice Cream Shop"

```

| Building Name      |
| :---------------:  |
| Sad Ice Cream Shop |

What a pitiful place that shop must be to have both ice cream and sadness. Oh well, at last our cell now has text. If
 we wanted to add another row with a "Melancholy Ice Cream Shop", we need do a bit more.

First let us clone the sad ice cream shop.

```python
clone = <text object>.clone()
```

We call the clone method to clone our text element. Just like copying and pasting in ArcMap.

To move our cell down all we must needs do is find the height of our cell and subtract it from the Y-coordinate of 
our element. Fortunately, [accessing properties](http://resources.arcgis.com/en/help/main/10.1/index
.html#//00s300000040000000) is straight foward.


```python
height = clone.elementHeight
clone.elementPositionY -= height
```


In a snap, our map would now display:

| Building Name      |
| :---------------:  |
| Sad Ice Cream Shop |
| Sad Ice Cream Shop |

Avast! We must needs change the text content on the last ice cream shop.

```python
clone.text = "Melancholy Ice Cream Shop"
```

| Building_Name             |
| :--------------------:    |
| Sad Ice Cream Shop        |
| Melancholy Ice Cream Shop |

Much, much better.

Now, for more advanced users you might notice that the manipulation of elements is limited. If you dive into all the 
properties available to style and design elements ArcMap, you will find a tome before you.

ArcPy isn't there to take you through the tome. It performs the core functions with ease, which is more often then 
not all you need. 

```python
import arcpy
import os


##
###### Helper Functions
##
def map_elements(map_doc, element_type):
    ''' Takes an Element Type i.e. "GRAPHIC_ELEMENT", "TEXT_ELEMENT" and
        builds a dictionary with the name of the element as the key and the
        object as the value. Excludes all elements not given a name '''
    element_map = sorted([(str(obj.name), obj)
        for obj in arcpy.mapping.ListLayoutElements(map_doc, element_type)
                   if len(str(obj.name)) > 0], key = lambda name: name[0])
    return {element[0]:element[1] for element in element_map}
    
def get_element_dimensions(element_object):
    ''' return tuple with element dimensions '''
    return element_object.elementHeight, element_object.elementWidth
def get_element_coordinates(element_object):
    ''' return tuple of element coordinates '''
    return element_object.elementPositionY, element_object.elementPositionX
    
def make_rectangle_text_cell(text_object, text_content, row_depth):
    text_height, text_width = get_element_dimensions(text_object)
    if row_depth != 0:
        text_object = text_object.clone()
        text_object.elementPositionY -= (text_height * row_depth)
    text_object.text = text_content

def to_pdf(map_doc, destination, page_id, page_index):
    ''' moves through data driven pages, exporting pdf '''
    map_doc.dataDrivenPages.currentPageID = page_id
    print "Exporting to PDF: {}".format(page_index)
    export_name = os.path.join(destination, "{}.pdf".format(page_index))
    map_doc.dataDrivenPages.exportToPDF(export_name, "CURRENT", picture_symbol="VECTORIZE_BITMAP")


##
###### MISC Functions
##
def move_arrow(map_doc, position_x, position_y):
    ''' adjust the north arrow as needed dependent on whether north arrow
        obstructs a view in ddp '''
    north_arrow = map_elements(map_doc, "MAPSURROUND_ELEMENT")["North Arrow"]
    north_arrow.elementPositionY = position_x
    north_arrow.elementPositionX = position_y
    
    
##
###### Application
##
class GenerateTable(object):
    """ To cycle through a ddp setup in an mxd and export out a unique table
        on each map, field names must match exactly between graphic and text
        elements in an mxd and the table passed into the class. Further, the
        ddp index name must also match a field in the table """
    def __init__(self, **params):
        self.__dict__.update(params)
        self.ddp_field = arcpy.mapping.MapDocument(self.mxd).dataDrivenPages.pageNameField.name
        
    def initialize(self):
        """ A temporary MXD is created to find the datasource of the ddp in
            the mxd, and then a cursor loops through the mxd wherein each loop
            translates to one map constructed and exported """
        temp_map_doc = arcpy.mapping.MapDocument(self.mxd)
        ddp_layer = arcpy.mapping.ListLayers(temp_map_doc, temp_map_doc.dataDrivenPages.indexLayer)[0].dataSource
        cursor = arcpy.SearchCursor(ddp_layer)
        for page_id, map_page in enumerate(cursor, start=1):
            self.construct_table(page_id, map_page)
        del cursor
        
    def construct_table(self, page_id, map_page):
        ''' A new mxd is stfarted to purge any previous tables that may have
            been constructed beforehand '''
        map_doc = arcpy.mapping.MapDocument(self.mxd)
        page_index = map_page.getValue(self.ddp_field)
        self.build_rows(map_doc, page_index)
        self.message.addMessage("Exporting to PDF: {}".format(page_index))
        to_pdf(map_doc, self.destination, page_id, page_index)
        
    def build_rows(self, map_doc, page_index):
        ''' If you build it, they will come '''
        text_map = map_elements(map_doc, "TEXT_ELEMENT")
        table_cursor = arcpy.SearchCursor(self.data)
        row_depth = 0
        for row in table_cursor:
            if row.getValue(self.ddp_field) == page_index:
                for field in text_map.keys():
                    make_rectangle_text_cell(text_map[field], row.getValue(field), row_depth)
                row_depth += 1
        del table_cursor
        
        
##
###### Application initialization
##
if __name__ == '__main__':
    MXD_PATH = r''
    TABLE = r''
    DESTINATION = r''
    input_values = dict(
        mxd=MXD_PATH,
        data=TABLE,
        destination=DESTINATION
    )
    APP = GenerateTable(**input_values)
    APP.initialize()
```