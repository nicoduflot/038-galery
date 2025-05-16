/* récupérer un nombre au hasard : Math.random() => renvoie un chiffre à virgule entre ]0, 1[ */
const randomNumber = Math.random();
console.log(randomNumber);
/* pour avoir [0, 10] */
console.log(Math.floor((randomNumber*11)));


window.addEventListener('DOMContentLoaded', function(){
    fetch('./csv/hammer-movie-list.csv')
            .then(reponse=>{
                return reponse.text();
            })
            .then(data=>{
                const tabData = data.split('\r\n');
                let firstLine = true;
                tabData.map(rawline=>{
                    line = rawline.split(';');
                    const tr = document.createElement('tr');
                    let counter = 0;
                    line.map(cell=>{
                        if(firstLine){
                            const td = document.createElement('th');
                            td.innerHTML = cell;
                            tr.append(td);
                        }else{
                            const td = document.createElement('td');
                            td.innerHTML = cell;
                            counter = counter + 1;
                            tr.append(td);
                            td.addEventListener('click', (event)=>{
                                event.stopPropagation();
                                //console.log(event.target.parentNode.children[3].innerText);
                                document.getElementById('moviePoster').innerHTML = '';
                                const imgPoster = document.createElement('img');
                                imgPoster.classList.add('img-fluid');
                                imgPoster.setAttribute('src', `./images/${event.target.parentNode.children[3].innerText}`);
                                document.getElementById('moviePoster').append(imgPoster);
                            });
                        }
                    })
                    if(firstLine){
                        firstLine = false;
                        document.querySelector('#filmography table thead').append(tr);
                    }else{
                        document.querySelector('#filmography table tbody').append(tr);
                    }
                });
            });
});