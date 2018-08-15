COUNTIES =  http://www2.census.gov/geo/tiger/GENZ2017/shp/cb_2017_us_county_500k.zip

counties:gis-data/richmond.topo.json
lean:
	rm -rf -- gis-data


# ### COUNTIES
gis-data/richmond.topo.json:gis-data/richmond.geo.json
	geo2topo -o $@ \
	--properties name=NAME \
	-- \
	richmond=$<

gis-data/richmond.geo.json:gis-data/shp/cb_2017_us_county_500k.shp
	ogr2ogr -f GeoJSON \
	-where "COUNTYNS IN ('01789073')" \
	$@ $<

gis-data/shp/cb_2017_us_county_500k.shp: gis-data/zip/cb_2017_us_county_500k.zip
	mkdir -p $(dir $@)
	unzip -d gis-data/shp $<
	touch $@

gis-data/zip/cb_2017_us_county_500k.zip:
	mkdir -p $(dir $@)
	curl -L "$(COUNTIES)" > $@.download 
	mv $@.download $@



