import React, { Component } from 'react';
import { Map, TileLayer, Tooltip, FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from 'react-leaflet-enhanced-marker';
import TextPath from 'react-leaflet-textpath';
import 'leaflet-draw/dist/leaflet.draw.css';

import { EditControl } from 'react-leaflet-draw';

const shapeOptions = {
  className: 'drawshape',
};

class KCBubbleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 37.09024,
      long: -95.712891,
      zoom: 4,
    };
  }

  _onCreated = e => {
    let zoomLevel = 6;
    if (e.layer._latlng === undefined) {
      this.setState({
        lat: e.layer._latlngs[0][0].lat,
        long: e.layer._latlngs[0][0].lng,
        zoom: zoomLevel,
      });
    } else {
      this.setState({
        lat: e.layer._latlng.lat,
        long: e.layer._latlng.lng,
        zoom: zoomLevel,
      });
    }
    e.layer.remove();
  };

  render() {
    const plant =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAPVUlEQVR4nMWbaZBc1XWAv3Pv6+6Z0YxmRhsICQmBsSSEWMVa4CCSFAaTVMoGVQooYYGDkTD+QQWT8i85lXJ5S1LxgimVXeFH7NhSOZUiDluoCMpYkS2ZTRpUrAGk0WyatXu27vfuyY/7Xi/Ts7XUo5yuN6/nvXvPPefcc892bwsLDHfv3WvXrl/fMBqmNxgXXqLGrsS5c8VIU0VDJ6GK61GVHmt4P6/BW5Ad3rNlS2Eh6ZOFQPrAq6+2NDS03iAqt6vIzaAbhSkMzwGqRCL8ryoHxcqLBcdLe369t4fdu109aa2rAB5+/dgFNnKPKdwlsLKeuIGcwivqzHcjM3qgXppRFwHs+sORjeLM4wh3A831wDkLhCgHnLjvHMueeuHlrVvDM0F2RgLY8dpry5uihq8r+qAILWeCq1aIl8h/R8oTT12z6fXTxXPaAth5qOPPjfB9YO3p4qgTjCn692PZvm8+vXXrRK2daxbAF/fvb1jUsuLbwE4gVWv/hQAFFTjgNNr+42su+7CWvjUJ4OE331xhCsEvgFtkgTzImYGcjDS696lrNr887x7zbfjo4SMXOcx/ABvLnysOI4ICJlL/TBQnAip+ADmrshpFeOBHV2/aO5/G86Lsywdfvziw6RcQ1k19FxkhiByTFoyLBQAIgohiMIjWQn9dYFKFB5+8etPP5mo4pwAe+e1razWTeUFg/fQtHLevXE6DAWusf6KCFPK8MzbG0ZFxEFMj/XUAZVzV3ffktZv/bbZmswpg52/eajcN5kVEtszUJmMcX7/0YlpMAMZ4bXcRocLBjz/h6Xc/omn5cowziDnbZkOGFb3zyS2bXp2pxYxTs1vVmMbgp7MxD2CMwcRyFPGqDwJiCARGT/UxOdCPM3WNYOcJ2ioiv3jocMeamVrMKIDeQ0cfU/Qv5hrCisQ2bsrsil8SKkquu4/J/gFAce4sC0J1VYA+/eizz2amez2tAL78uyNbxJi/nY+rs0gRSTz3GAFFSQUBEhpEDLneU4z294ERnJ5tqyi3RCvWfG26N1UCuLujIx0E9p+AxvmgNiKYqUYu5s8ag8QuUHCM9vYwMdCHOctuQUBQefyRNzo2TfOuEnYd6vgKwvfnmv1ElTNBwAbrCHPZogqIE1xgGMyOc6SrF8FrhAiog+ZzltOwdCniQMzZ8xCCvNjz4dE79m3bFiXPgvIGj/zu2FIV97VaorxGIi5etoz8ojQSxwFGITIRvdbQcdKhYrxxVG8oc729iBFS7e2VBCwwKHrrsgsv/Szwn8mzivHVRA8Kcv78kHloT1luWN6OSisiPg4QVSJVPhjJ8ezb76Pxmk+WgxpHtrubFiBoX4pq7D0W3ksGgj7x0OHDLyb1hKL+7eroaBaRv5ovJjWgVvw6DwKMSZEyASmbAmsxYmkLgqKktMzwGRcgWHI9fYwO9OFEUc6OXRC4wUrj9UVaigyNcavCRbUiNMb4dAzKWPD/WVsygtOBOsdYXy+Tg/3o2TOMgXHsSP4pCsAI99WihKL+SolgYgOXdDYIiCDisCIVs1+JRFAVcl195AcHvRDcWRCEyJ07f/NWu6cVH/ICt9aEQ72xs7GNl7L5N3jrLngB+DGrZSsIol5Lst09TA4NEJ6ViFGX08gfJbRim8y1wNLTQWWtAfX5XxG9gqBxRjg/pYokZLizk/zgwOmQUTMYsZ+F2As4lVtqNcAm9t8N1qDGYkjSYBAxOA1JmzSBFSSaG7vVFAiMdp8ChcySpViVhaslOG66Zf/+wKAqoNedLh4zSyBjZPb304GqkuvpIT80gFtIwyi6fl3r6nbz6HPvpwWZIdefGRSH4kgZ49c8FFeB4g2hGFO0ATMawirCfNSY6+olPzTkx3FK/b2kBA3h+CXB5ArXEsDKmhVNAFUyxsZqX2YDBKwTTCyAeTNPbBjj+Czb1e2TqtY2bBJN1hEE82ljNDx/OvenqsVr2s7i2wTWIjGTFU1F4szw9GN9J45sdxeFkaEF0ADAmPMDI265YhLTXWHQE7VWVVSS2fGgztcDrUvyCinZq7i9ESEIBDGJIGsThqgvteRO9oIq6bYlGCd1rCzpcoPKUp+lUExWPDtxpFMkBiqm2Oc2WOMtgF8CSerrowIrhiAI8HFC7VCsLgG57m4Kw0M4Uz9VEFhq1IhN4liFoiyIGZo6XLIkFBAVUtNY+SQqNCKkrIlxnNmsOYGRzi4KQ0OA1sUwqogtZYPFep6WHHqi8oIflERRlEjAuoDMtIwJJlaltMH7w2iaZjWAcRYEsl09OByZtiWx9zkzwRpByraZYxbL1LkEZUMlWqKKDWbP6K218UzVZ906Df1yyA7VAZsWDBoN+u9QIlLL/paDD3BVQFyEE0daHLMlsymxOAQnDid+b/tMNFfEImoYOdHDxNAAEVGlbaoFlEETmXSPRxwHLH4YoNJmS9k98QbJOp9t+MB6EyOxWwzOUGmlSAGMnOyiMDJ82oZR0F6jjk6kZO6l7KJ4L5/j5O7Fo0LJehYhaa/eS6j61lp6rmVtvGHVqr7VH4pvQDFiyJ7sYbJ/0EeMOnMmmWCXcnyOEybTa7II3W4WWy3Fj5YEJAaMEjpHoYK4clYgbePdIi2LFOO7DQyaEpyNiESr+gJk0gFOqk/D+LaCcyFj3b0UhgaJd+ZmFsIU5pzoe+YHt38qryLvzF8xS3bCCuSdmyZaLIkqE6TiZRIXRROdco6lLuSP157HbRvWY1V9YQUwzhGYkE0tDdy96WIuWNxMIEm+6SPEBhNx8+oVXLvmPFSUbHcPDGdxUbW7UdWi0XalKYzIu7cDRFQOdxwWuKXM/83KvMbiDPAVnJKt0FhPSka0JRMgrhRahmGeJgvXrlrO5664nNVLljFcmOTdE5/wcc8Akk6xYdUqblu/ji2r1yCAmwz5Zc9RWtpbKeTz3HjBOrZduZnmTJrnj73DoeM9oND98cc0tC5m8flrS/QmEW41F++dm79sIAAQMa+g7q/n66qSZZ9CaCjz+cnsClJc100xSuMcS1sauP6cldx+xZW0NpX2XdrTGS5fcg6Noty2fgOXr1tHJpUqCvHWjet57o23uOHcJfzplVeworGxSGqhUFoeYgPG+wdZ3NYGLW1F5kvaXcafyIHdWyX0Tjzkf7AMAW3zkkCMLJ0OaFnUWNwcTcB7VC/9dJCitTDGnVddxk3rN7I4k66SswKfv+4qjLXYqjhfaWzM8MMH7qvqJKo0N/pQLDHGqcYGov5+ojAi1daO+CSmqJWJMJzyPMSm/EfXbRwAXpk/8x4ChIyxU6Rc7jmgtamZSy9Ywx2XXc7ihnQVjqRXOgiKtYNKayhTS86+n4AmW034sFwQIqeM5Av0f/AeYX+/b1cxEgCDEeP7iwLAL96f1xZdq98Encn1xJgmCgVS6XRxOU6GIYVCSCGMmMwXiOaoAlfwHn9JGEWgoNVxSBg5bFML2a5OyA4XhVQ2Nc/v2bLlFJTtDA0Vss+32ZaPmOYYzPSUKYVCnigMk8yoYpDk++TEBKf6fbC5942jHPjoE6yxNKUCLlzcTEf/ENZ4Jr71uT/BiikK63v7D9CTzSHARcvaSVnLO72nADi3uYXHtt5AOFF9Mi5J5iKbovOdd2lbuZKWVavjdMRERs2epG3RgP/s+utHVNhThW167n1OblOYoNr5apnSLWpZRGv7ElAYmZjk1Og4PdkcIxN5Mk1N9GRHOTmco2s4i1OtOE/UmxuleyRH10iOvlyOobEJTo5kOTmcZWBsHIDGhnRFzloeKSJCalEz0dgY0egQTiKcRgfzMvrbKgEAjI9N/lSRzllZjysmqsqEJvWAhHGqKkOROibCAuCY1Mq6gE75ruqKwcrUoCXZO5yq7nnn5iyeToQhfcdPks/mImOCb5WfM65I5f75M1f17Tr89ncV/hHKC9JlyZH401+qQhApi2x5DpEQG99FaAjSGGspRBHntTSxZc15KEJLOs3qtla2nH9esV8oSibBpcpFy5ewrMWfwD2/uQVScDlChHLuokWUylezxy6CNwPZE10vf7gq/3z526pcti8/tGdFpu0+VS07G1SK/hTFxU+sCGlrKr3AFFp8OqykreXzmy+ZQhpsvXANSYSOlngyCDuvu6o4C2EUgeYRk0GTiN45Zq6LVPolEUajiMenHq6uKufsu/HGcQeP4jW8Kr43CBIbVSMOi501v7PWE1tu7JNssohby4owUpKhQ4jiS43FmCZUDAaD1aTOMFf06uXq0H/41f13VR2qnrZK+eOrLzkI8nde0GUiUK8DTsCpw5oIO4fjNIZi1ViKrJfEkGyf+XS5lGiL+AjT4K9A/DE7G9/FljE9Rz1A4MCpMPfNaembqdOK3MZv43y0VJZLlsli7u1v8PUAH7bVpyJUK6jSm4/C+1/esWPak+QznxPcKuG4nbxfRI54TJQFIqCBxSqErkAY5YlcAVd2hfEVGK/T4sKK9/W4Is2DOp+aT8c8Oq5O7/n3L/7lBzPxOee07PpDx6dEeYkpvwuIRFkuwnXNDRCFgBbPBaiWyif9E5O8dbyLrRevPaNNkulAo4jXe7t4/eQAtjogzSM8uPe+u/5lNhzz0suvHD622eGeEbig+NApkXWEY+MMdh5HohB1fu26sgqPYLFiUC2gC3Bm2EmIjYIKLVBlUuDRvdvv+gkzOYkY5r0wdx56c72R1DOgn64gQB3hxChDJzqhEKFa+45wnWFcVb60b/sXfj6fxjVZpi8dOXJOOm9/iepnEm/l8AYxmhhl+KMTaFwh+n8SQjdG7tl77xf2z7dDTVT+ZPPmnr7JodsFeQoIoRSHBQ2LaF+7GpcyiJTOBNeyM3y64J2S/l5xN9fCPJz+boXs+v2RbWLM94DVycNIHW5ijP7jJzCh14TExy8c6ISiPxjWiW+8uH37aK29z4iyhw+8scqkU98QuAdoDAFRhxsfZfB4J0QuLkvFpbL6CsIpHETdE/u2b5vx9wBzQR0oUnn40NvXWOFvgDuAjEMpjOUY7uxECxHU1zA64IiKfCc30Pmr57761ckzQVa3Kdm9W03Pnx29VJzcqyJ3KXphNJ5j6BOvCXUwjMMiPBNFurfZLXvp6R21/0ZwOliQxfnQ4cNNkLnJwB0ul7t1sOvkBvKFlGIwxhRtw2wQp0edovqqWvMs+ei/9u3Y1l1vWhc8QL9b1U7866/bUzp2iQnNpapunbVmpWrl7xHEb6B3gzkRER4zyFE+pHPf7m35haTv/wASWwN5c3YbxwAAAABJRU5ErkJggg==';
    const truck =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAvpQTFRFAAAAVaqqXbnRacjSaMvTaMvUaMvUaMvTZ8vUaMzUacvVaMnVZszMZszMYsTEZszTZ8vUaczVaMzUaczVaMvVaczUacvVZszMAICAaMfPacvTaMzVaczUaczVZcrSZMfTacvTacvUaMvVZszTQL+/YcLOaMvVaMvVaMvQacvVaczVaMzUYL+/aMzVaMzUaMzVaMvUacvSaMXRaczUaczVaMvTZszTaczUaczUaMrTZ8jPacvVaczVaMrVY8XOaMvVacvVZ8rTacPSaMvUaMzVZszVaMzVaMzVZszVZ8rTSba2Z8nTVarVacvUZcrQaMvVaczUXsnJacvUfdPb2PL02/P1seTpaMzVVb/Vl9zi////4PX2acnRaczVaczVacvVZszSaMnU6fj5u+js8vv7ktrgtebqruTojtnfaszVaMzU1fHz9/z9uufs7Pn6nN3jacvVAAAAtubruOfrsuXp9Pv8b87XaMrUddDYd9HZ8Pr7jdjfxOvvvejsacvVZ8vU0O/yZ8rT0vDyacvUZ8rTacvV8/v8+f39Z8nUaczU3fT2ruPopODmvunt9fz8rePo3PP1aMvU+P39ldvhsOTp5fb40e/ykdrgxOvuz+/yseXplNvhaczVkNng3vT2/v//pODlz+/xzO7xpuHm/P7+4PT2/f7+aMzUaMnTy+3xventi9fe+/7+jNjfuujsaMvVaczUltvimt3j7fn6od/lquLn3/T2ot/lnd7kaczVaMvVbM3WmNzi+v3+idfezu7xgNTbh9bdgtXcftPbfNLaaczU6/j5uefraMvUW8jIedHZdNDYaMzV1PDz/f7/bs7Wa83V2vL1nd7jZ8rTaMvVVcbGacjRaMvVaMvTaMvVaMzUaMzVZ8rRY8bVaMzUZszSaMzVacvRacvVaczVZMjTacvVacvUZszUaMzVaMvUaMvUZ8vVaMbQacvVaczVaMvVaMzUZMjTaMvUacvUaMvVZszMaMzVaMvUYMrVZ8rSZ8rUaMzTZ8rUZMnRZdO1lAAAAP50Uk5TAAMLM112jpiUfWZCFAUNRo/M9f/826MZAiCS5vO0Pyme+8FLBBXyujFO4IIIkfr+xCIWvuVAI9b0ViXe+Fsf2PZSEcvwPK7kHnQHNAbFK2y5E+L/////wgz///89qursUEf//////////4f//////9QB//////9l////////l1n/XP+tV6j//y+B/////////7//////////////i//////////////XTP///////53v//////////9VsP/////////////u//+mDv//eP///////2+8CTj3e7bp0kMk+S3fJ9laF8DnQZbJ44obnP020C6J3aIKkKcYPmqkTSElXutpAAADpklEQVR4nKWXd1TTQBzHDwVnFeRAERVBKIqgRVBERcWBaAU3KlFcBcWBWIa4Jy6GAwUciIoLxb2Vorj3Hrhw4d57+56XpilJemmT8v2j7+5xn8/75RIuvwDAE5NSpU3NypRFKVe+QkVJJb51+FQ2t6hiCRmxsq5qWs1GKF7dtgbEpGYtO0F11LavicPJONRxdDKESy2c+XD1pdStp593qa8PJ2Pp6saPuzVoaIiHUObeiI/38JQZ5lEaN8HzXk0F4SjezXB88xZCeQh9WuryrVoL5yH0bcPl27YTw0PY3o/N23QQx0Po35El6CRs/5nxlDP4zr6ieSgrX8wHBIrnIXTuohV0FX8BZLqZaPjuPYzioYOjRmBGznr2CtKb3hhDH+p86GtNToIJ/emHK6G/WuAiM1YA7dWCEGi0YEBb8iEeaLwADkKCwZAhGKLQTSglCBuqybDw4VpBWSQYwRSEjtTNKEoQUVzN6EhaMMYJKD2ZAj2XEMGcRdH3QQrkjY0REHQNdkAiEyWIjomJJjcldiyFxYF6UJRgHFo6fgIaBFOYKzBnCYLCJ3ITPoQrgJPQYDKFTQFTxVcAFWgwjcJCwHQjBTMobGbJBfElE8zibKJBwexQlDnFgilgrjiBNhrBPLEPElcQB+Q1OIKExKTk+XyC+clJCxYyBU2AchFLkLJ4SUJqWvokvGBp2LLUhOUrYrUCKw8AMliClZnk76rVa3CCrLXryOH69A20YCPqmbKZgk2bqeXrcrZgBFvnUONtWbRgO/lW2KEe7lT/addugli2B23B3n0cQeY2InU5usT9aejnAP0oH0QC5SH1MHenCmVcHkEchkfQ/0qOip38o6octDNZ8BiyHVepTpDQSQl5KjdjvthOodsQnUIQayEmiQSRdxqVFksfimfUx/pZZm8TRRW85RxOcJ46HokYzdxK021dYKzJvUiuuKTC8Win1Vs78rJm6q5pfaX+jDVXIo8EKfLxPIT5iqtrruXSBWTTr/frxr3eb2gb55siOywq3oy2+VaBeF7mymyybou/CHdW0+10Ryx/14vdKErvieN97wNOCg1+KTDzYDqXB+DhI+G8T5xSVwAePxFcfxEGR3n6TNi9eP4Cz6MH6qWDYVz2qpCPR2dD/GtDfMGbUvw8ytt3evvu94F+enGyiA8dfHjxj0VyQzyKzafPX3B4+6/Zej4Z2flm/v0e6xNS9vqH6U+hNBUTya/fGX9mooTYmv39F8C37j9WMrxPj20oLQAAAABJRU5ErkJggg==';

    const textpath = this.props.mapData.map(line => {
      if (!(line.SHIP_PLANT_GROUP_FULL_MIN.search(line.PLANT) === -1)) {
        const shipLat = line.SHIP_PLANT_LAT;
        const shipLong = line.SHIP_PLANT_LONG;
        const shipPlant = line.PLANT;

        const textpathinner = this.props.mapData.map((line, k) => {
          if (
            !(line.SHIP_PLANT_GROUP_FULL_MIN.search(shipPlant) === -1) &&
            shipPlant !== line.PLANT
          ) {
            return (
              <TextPath
                positions={[
                  [`${shipLat}`, `${shipLong}`],
                  [`${line.SHIP_PLANT_LAT}`, `${line.SHIP_PLANT_LONG}`],
                ]}
                key={k}
                text="&#x2C3;"
                center
                offset={18}
                color={this.props.ThresoldValue < 30 ? '#2ca02c' : '#d62728'}
                attributes={{
                  fill: this.props.ThresoldValue < 30 ? '#2ca02c' : '#d62728',
                }}
                onClick={() => this.props.lineHandler(line.PLANT)}
              />
            );
          }
        });

        return (
          <div className="row listrow" key={line._id}>
            {textpathinner}
          </div>
        );
      }
    });
    return (
      <div>
        <Map
          style={{ height: '600px', width: '100%' }}
          center={[this.state.lat, this.state.long]}
          zoom={this.state.zoom}
          zoomControl={true}
        >
          <TileLayer
            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=https://www.openstreetmap.org/copyright target=_blank>OpenStreetMap</a> contributors"
          />

          <FeatureGroup>
            <EditControl
              position="topleft"
              onEdited={this._onChange}
              onCreated={this._onCreated}
              onDeleted={this._onChange}
              draw={{
                rectangle: { shapeOptions },
                marker: false,
                polyline: false,
                polygon: false,
                circle: { shapeOptions },
                circlemarker: false,
              }}
              edit={{
                edit: false,
                remove: false,
              }}
            />
          </FeatureGroup>

          <div>{textpath}</div>

          {this.props.mapData.map((location, k) => {
            return (
              <Markers
                key={k}
                position={[
                  `${location.SHIP_PLANT_LAT}`,
                  `${location.SHIP_PLANT_LONG}`,
                ]}
                icon={
                  <a alt={location.PLANT}>
                    <img
                      className="mapIcon"
                      src={location.PLANT_TYPE === 'Plant' ? plant : truck}
                      width={Math.round(
                        15 * Math.log(location.ACTUAL_DELIVERED_QTY / 100),
                      )}
                    />
                  </a>
                }
                onClick={() => this.props.iconHandler(location.PLANT)}
              >
                <Tooltip direction="right" offset={[20, -2]} opalocation={1}>
                  <div>
                    Ship Plant:
                    <strong>{location.SHIP_PLANT_GROUP_FULL_MIN}</strong>
                    <br />
                    Dest Plant: <strong>{location.DEST_PLANT_FULL_MIN}</strong>
                  </div>
                </Tooltip>
              </Markers>
            );
          })}
        </Map>
      </div>
    );
  }
}

export default KCBubbleChart;
