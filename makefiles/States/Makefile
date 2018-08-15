STATES = http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/cultural/ne_50m_admin_1_states_provinces_lakes.zip
DIVISIONS = ftp://ftp.ncdc.noaa.gov/pub/data/cirs/climdiv/CONUS_CLIMATE%20_DIVISIONS.shp.zip
DROUGHT = ftp://ftp.ncdc.noaa.gov/pub/data/cirs/climdiv/climdiv-pdsist-v1.0.0-20151007

states:data/states.topo.json
divisions:data/divisions-merged.topo.json
drought:data/drought.csv
clean:
	rm -rf -- data


### STATES
### Used for hero-map
data/states.topo.json:data/states.geo.json
	topojson -o $@ \
	--properties name=name \
	-- \
	states=$<

data/states.geo.json:data/shp/ne_50m_admin_1_states_provinces_lakes.shp
	ogr2ogr -f GeoJSON \
	-where "iso_a2 IN ('US')" \
	$@ $<

data/shp/ne_50m_admin_1_states_provinces_lakes.shp: data/zip/ne_50m_admin_1_states_provinces_lakes.zip
	mkdir -p $(dir $@)
	unzip -d data/shp $<
	touch $@

data/zip/ne_50m_admin_1_states_provinces_lakes.zip:
	mkdir -p $(dir $@)
	wget "$(STATES)" -O $@.download
	mv $@.download $@



### DROUGHT
data/drought.csv:data/drought.txt
	python parse_climate.py $< $@ data/drought.json

data/drought.txt:
	wget "$(DROUGHT)" -O $@

### Divisions

data/divisions-merged.topo.json:data/divisions-unmerged.topo.json
	-topojson-merge \
	-o $@ \
	--in-object=divisions \
	--out-object=states \
	--key d.id \
	-- $<

data/divisions-unmerged.topo.json:data/divisions.geo.json
	topojson -o $@ \
	--id-property STATE_CODE \
	--properties code=STATE_CODE \
	-q 1e9 \
	-s 1e-6 \
	-- \
	divisions=$<

data/divisions.geo.json:data/shp/GIS.OFFICIAL_CLIM_DIVISIONS.shp
	ogr2ogr -f GeoJSON \
	$@ $<

data/shp/GIS.OFFICIAL_CLIM_DIVISIONS.shp:data/zip/CONUS_CLIMATE_DIVISIONS.shp.zip
	mkdir -p $(dir $@)
	unzip -d data/shp $<
	touch $@

data/zip/CONUS_CLIMATE_DIVISIONS.shp.zip:
	mkdir -p $(dir $@)
	wget "$(DIVISIONS)" -O $@.download
	mv $@.download $@

