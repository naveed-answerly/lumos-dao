'use client'
/* To handle component draws for pages */

import { API_URL, floatingConstant } from "../data/constant"
import { N } from "./core"
import { fAddr } from "./getter"
import dotIcon from '../icons/dot.svg'
 
//to draw proposal box
export const drawProposal = (prop) => {
    let _div = document.createElement('div')
    let h = (prop.yes_votes + prop.no_votes) + (((prop.yes_votes + prop.no_votes) > 1) ? " members" : " member")
    let voteYesRes = N(prop.yes_votes) * (N(prop.yes_voting_power) / (floatingConstant))
    let voteNoRes = N(prop.no_votes) * (N(prop.no_voting_power) / (floatingConstant))
    //calculate yes and no votes bar
    const tmp = (N(prop.yes_votes) * (N(prop.yes_voting_power)/(floatingConstant))) + (N(prop.no_votes) * (N(prop.no_voting_power)/(floatingConstant)))
    let yes_per = (Math.floor((100 / (tmp)) * (N(prop.yes_votes) * (N(prop.yes_voting_power)/(floatingConstant)))) + "%") || "0%"
    let no_per = (Math.floor((100 / (tmp)) * (N(prop.no_votes) * (N(prop.no_voting_power)/(floatingConstant)))) + "%") || "0%"
    if(tmp == 0) {
       yes_per = '0%'
       no_per = '0%'
    }
    const id = prop.proposalId + '_countdown'
    let _link = `/dao/${prop.dao}/proposal/${prop.proposalId}`
    _div.innerHTML = `<div class="p-6 bg-white rounded-lg shadow-md">
              <div class="flex justify-between items-center mb-10 font-[500]">
                <p></p>
                <div>
                  <p class="text-sm flex items-center gap-1">Created by: 
                  <img src="${API_URL + "user_img&user=" + prop.creator}" class='w-[30px] h-[30px] rounded-full'  alt="" /> 
                  <a href='/user/${prop.creator}' class="text-blue-600">
                  ${fAddr(prop.creator, 6)}
                  </a></p>
                </div>
                <div class="small-card" ${(prop.voted == '3') ? "style='display:none'" : "" }>
                    <div class="small-card-text">You Voted ${(prop.voted == "2") ? '<span class="text-red">NO</span>' : '<span class="text-green">Yes</span>'}</div>
                </div>
                <p id='prop_main_status_${prop.proposalId}' class="bg-gray-200  ${(prop.status == 4) ? 'text-black-700' : (prop.status == 0) ? 'text-grey-700' : (prop.status == 1) ? 'text-green-700' : (prop.status == 2) ? 'text-red-700' : 'text-black-700'} rounded-full px-3 py-1 text-sm">
                   ${(prop.status == 4) ? "Ended" : (prop.status == 0) ? "Inactive" : (prop.status == 1) ? "Active": (prop.status == 2) ? "Rejected" : "Funded"}
                </p>
              </div>
              
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-[500] text-blue-500 underline"><a  href="${_link}">${prop.title}</a></h2>
                <p class='text-red-500' id="${id}"></p>
              </div>
              <div class="mt-4">
                <p>
                ${prop.description}
                </p>
              </div>
              <div class="mt-4 flex flex-col justify-between items-center gap-5">
              <div class="border w-full rounded-md flex justify-between items-center">
                <div style='width:${yes_per}' class='cursor-pointer flex items-center justify-between bg-[#03C17C] w-full text-white py-[6px] rounded-md text-center'>
                  <div class="flex items-center text-gray-500">
                    <p>Yes</p>
                    <IoMdCheckmark />
                  </div>
                  </div>
                  <p>${yes_per}</p>
              </div>
              <div class="border w-full rounded-md flex justify-between items-center">
                <div style='width:${no_per}' class='cursor-pointer flex items-center justify-between bg-[#03C17C] w-full text-white rounded-md py-[6px] text-center'>
                  <div class="flex items-center text-gray-500">
                    <p>No</p>
                    <IoMdCheckmark />
                  </div>
                  </div>
                  <p>${no_per}</p>
              </div>
                
              </div>
              <div class="mt-4 flex justify-between items-center">
                <div class='flex items-center gap-2'>
                  <IoFingerPrintOutline class='text-blue-400 text-[20px]'/>
                  <p class="">Proposal ID: ${prop.proposalId}</p>
                </div>
                <div class='flex items-center gap-3'>
                  <p class="text-sm text-gray-500">Voted by: ${h}</p>
                  <button class="bg-[#198754] text-white rounded-md px-4 py-2"  id='prop_main_end_${prop.proposalId}' class="small-card" style='display:${(N(prop.status) != 1 && N(prop.status) != 0) ? "" : "none !important"}'>
                    Result ${(voteYesRes > voteNoRes) ? "Yes" : "No"}
                  </button>
                </div>
              </div>
             </div>
    `
    const targetDate = new Date(N(prop.end) * 1000);
    // Update the countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    // Function to update the countdown
    function updateCountdown() {
          var currentDate = new Date();
          var timeDifference = targetDate - currentDate;
      
          // Calculate remaining time
          var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      
          if(E(id)){
            // Update the countdown display
            E(id).innerText = 'Ends in ' + days + ' Days | ' + hours + ' Hours | ' + minutes + ' Minutes | ' + seconds + ' Seconds'
        
            // If the countdown is finished, clear the interval
            if (timeDifference <= 0) {
              clearInterval(countdownInterval);
              E(id).innerText = 'Countdown ended!'
            }
          }
        }
    return _div.firstElementChild
}
//to draw proposal review box
export const drawProposalReview = (prop, is_Admin) => {  
    let _div = document.createElement('div')
    let _link = `/dao/${prop.dao}/proposal/${prop.proposalId}`
    const id = `prop_review_${prop.proposalId}`
    
    _div.innerHTML = `<div id='${id}' class="p-6 bg-white rounded-lg shadow-md">
              <div class="flex justify-between items-center mb-10 font-[500]">
                <p></p>
                <div>
                  <p class="text-sm flex items-center gap-1">Created by: 
                  <img src="${API_URL + "user_img&user=" + prop.creator}" class='w-[30px] h-[30px] rounded-full'  alt="" /> 
                  <a href='/user/${prop.creator}' class="text-blue-600">
                  ${fAddr(prop.creator, 6)}
                  </a></p>
                </div>
                <div class="small-card" ${(prop.voted == '3') ? "style='display:none'" : "" }>
                    <div class="small-card-text">You Voted ${(prop.voted == "2") ? '<span class="text-red">NO</span>' : '<span class="text-green">Yes</span>'}</div>
                </div>
                </div>
              
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold"><a  href="${_link}">${prop.title}</a></h2>
                <p class='text-red-500' id="${id}"></p>
              </div>
              <div class="mt-4">
                <p>
                ${prop.description}
                </p>
              </div>
               
              <div class="mt-4 flex justify-between items-center" ${(!is_Admin) ? 'style="display:none"' : ""}>
                <button onclick='approveProposal("${prop.proposalId}", "${id}", event)' type="button"
                    class="bg-green-800 text-white text flex align-items-center gap-2 mb-0" style='padding:10px 15px;border-radius:10px'>
                        Approve
                </button>
                <button onclick='rejectProposal("${prop.proposalId}", "${id}", event)' type="button"
                    class="bg-red-800 text-white text flex align-items-center gap-2 mb-0" style='padding:10px 15px;border-radius:10px'>
                        Reject
                </button>
              </div>
             </div>
    `
    
    return _div.firstElementChild
}
//draw delegate box
export const drawDelegateinfo = (params) => {
    return `<div class='flex items-center justify-between' style='margin-bottom:20px'>
                    <div class='flex items-center gap-2'>
                      <img src="${API_URL + "user_img&user=" + params.delegatee}" class='rounded-full w-[30px]' alt="" />
                      <p class='cursor-pointer'>${fAddr(params.delegatee, 6)}</p>
                    </div>
                    <p style='margin-left:auto'>${fAddr(params.delegator, 6)}</p>
                    <span class='text-sm' onclick='setUpDelegateModal("${params.delegatee}")' style='margin-left:10px;color:dodgerblue;cursor:pointer'>${params.others}</span>
    </div>`
}
//draw other address
export const drawOtherAddress = (addr, addrName) => {
  let tm = document.createElement('div')
  tm.innerHTML = `<div class="mt-2 bg-white shadow-lg rounded-lg p-3">
            <img class='rounded-full'  src='${API_URL + 'user_img&user=' + addr}' alt="" style='width:30px;height:30px'>
            <p class='text-green-700'>${addrName}</p>
            <p class="font-[600] text-gray-500 bg-[#EFF2F6] p-2 mt-1 rounded-[6px]">
               ${fAddr(addr)}
            </p>
          </div>`
  return tm.firstElementChild
}
//draw admin user
export const drawAdminUser = (params) => {
  return `<div class="mt-2 bg-white shadow-lg rounded-lg p-3">
            <img class='rounded-full' src='${API_URL + 'user_img&user=' + params.user}' alt="" style='width:30px;height:30px'>
            <p class="font-[600] text-gray-500 bg-[#EFF2F6] p-2 mt-1 rounded-[6px]">
               ${fAddr(params.user)}
            </p>
            <div class="position-absolute cross-dao-setting" onclick='removeAdmin("${params.user}", event)'>
                      <svg class="text-danger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor" width="20px" heigth="20px">
                        <path fill-rule="evenodd"
                          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
          </div>`  
}
//draw top voters
export const drawTopVoters = (param = {
  voter: "",
  vote: ""
}) => {
    let tm = document.createElement('div')
    tm.innerHTML = `<div class='flex items-center justify-between' style='margin-bottom:15px'>
              <p class="text-sm flex items-center gap-1"><img class='w-[30px] h-[30px] rounded-full' src="${API_URL + "user_img&user=" + param.voter}" alt="" />By 
               <a href='/user/${param.voter}' class="text-blue-600">${fAddr(param.voter, 6)}</a></p>
              <p>${param.vote}</p>
            </div>`  
    return tm.firstElementChild
}
//draw user
export const drawUser = (params) => {
  return `<div class="flex items-center flex-column flex-md-row align-items-start align-md-items-center gap-1 w-100">
                              <img src="${API_URL + "user_img&user=" + params.user}" class='w-[30px] h-[30px] rounded-full'  alt="">
                              <p id='dao_search_admin_found' class="mb-0  column-content text-truncate text-break text-wrap">
                              ${fAddr(params.user, 14)}</p>
                          </div>`
}
//draw members
export const drawMember = (params) => {
  return `
  <div class='flex items-center justify-between relative' style='margin-bottom:20px'>
                    <div class='flex items-center gap-2'>
                      <img src='${API_URL + 'user_img&user=' + params.member}' class='rounded-full w-[30px]' alt="" style='flex-shrink:0' />
                      <a href='/user/${params.member}' class='cursor-pointer'>${(params.member != walletAddress) ? fAddr(params.member) : "You"}</a>
                    </div>
                    <img style='display:${(params.member != walletAddress) ? '' : "none"}' src='${dotIcon.src}' id="memBan-btn_${params.member}" class='cursor-pointer' onclick='toggleMemberModal("member-ban_${params.member}", event)' />
                         <div id='member-ban_${params.member}' class='absolute p-4 border rounded-[6px] right-[20px] top-0 flex items-start flex-col bg-white gap-2' style='display:none'>
                          <button onclick='${(params.isBan) ? 'unbanMember("'+ params.member + '", "member-ban_' + params.member + '", event)' : 'banMember("'+ params.member + '", "member-ban_' + params.member + '", event)' }'
                          style = "${(params.isAdmin) ? "":'display:none'}"
                          >
                            ${(params.isBan) ? "Unban member" : "Ban member"}
                          </button>
                          <button onclick="window.location = '/inbox?to=${params.member}'"
                          style = "${(!params.member == walletAddress) ? "":'displaynone'}"
                          >Message</button>
                        </div>
                  </div>`
}
//draw delegate search results
export const drawDelegateSearchResult = (param) => {
          return `<div class="flex justify-between mt-4">
            <div class="flex gap-2 items-center">
                <img src="${API_URL + 'user_img&user=' + param.user}" alt="Profile Image" class="w-12 h-12 rounded-full">
                <div class="text-center text-sm mt-2">${fAddr(param.user, 14)}</div>
            </div>
            <div>
                <button id="${param.user}_delegate" onclick='addUserDelegate(${param.type}, "${param.user}")' type="button"
                    class="bg-green-600 text-white flex items-center gap-2 mb-0 px-4 py-2 text-[14px] rounded">
                    ${(param.type == 1) ? "Confirm delegation" : "Reclaim delegation"}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                        <path fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
`
}
export const drawDelegateModal = (params) => {
  return `<div class="flex items-center flex-column flex-md-row align-items-start align-md-items-center gap-1 w-100">
                              <img src="${API_URL + "user_img&user=" + params.delegator}" class='w-[30px] h-[30px] rounded-full'  alt="">
                              <p id='dao_search_admin_found' class="mb-0  column-content text-truncate text-break text-wrap">
                              ${fAddr(params.delegator, 14)}</p>
                          </div>`
}